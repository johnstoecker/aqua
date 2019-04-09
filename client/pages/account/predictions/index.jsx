'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('./comment-form.jsx');
const Button = require('../../../components/form/button.jsx');
const tagImageHash = require('../../../../data/tag_hash.json');
const Houses = require('../../../../data/houses.json');
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'


class PredictionsPage extends React.Component {
    constructor(props) {

        super(props);
        console.log("props here:")
        console.log(props);
        this.loadPredictions(props);
        // TODO: figure out a way to share user between pages
        Actions.getUser();

        Actions.getHouseStats();
        this.state = Store.getState();
        this.hideDoubleDown = this.hideDoubleDown.bind(this);
    }

    loadPredictions(props) {
        let params = {};
        if (props.match.params.username) {
            Actions.getScopedUser(props.match.params.username)
            params.author = props.match.params.username
            Actions.getPredictionsForUser(params)
        } else {
            if (props.match.params.house) {
                params.house = props.match.params.house
            } else if (props.location.search && props.location.search.match("id")) {
                params.id = props.location.search.substr(props.location.search.indexOf("id")+3)
            }

            if (props.location.search && props.location.search.match("page")) {
                params.page = parseInt(props.location.search.substr(props.location.search.indexOf("page")+5))
            }
            Actions.getPredictions(params);
        }
    }

    componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    deleteComment(comment, pred) {
        Actions.deleteComment(pred._id, comment._id)
    }

    searchPredictions(tag, event) {
        event.preventDefault();
        Actions.getPredictions({tag: tag})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params != nextProps.match.params) {
            this.loadPredictions(nextProps);
        }
    }

    handleCommentSubmit(id, newComment) {
        // this.state.predictions.data[0].comments.push(newComment);
        // this.state.predictions[0].comments.push(newComment);
        Actions.addComment(id, newComment);
    }

    goToNewPrediction() {
        this.props.history.push('/account/predictions/new');
    }

    doubleDown(prediction) {
        if (this.state.doubleDownCoins) {
            Actions.addWager(prediction, {coins: this.state.doubleDownCoins});
            this.setState({showPredictionDoubleDown: ""})
        }
    }

    handleCoinChange(event) {
        // TODO: max coinage set to available coins
        this.setState({doubleDownCoins: event.target.value});
    }

    hideDoubleDown(event) {
        event.preventDefault;
        this.setState({showPredictionDoubleDown: ""})
    }

    showDoubleDown(prediction) {
        this.setState({showPredictionDoubleDown: prediction._id})
    }

    toggleShowPredictionPicker(prediction, event) {
        this.setState({showPredictionX: event.pageX, showPredictionY: event.pageY+5})
        if(this.state.showPredictionPicker == prediction._id) {
            this.setState({showPredictionPicker: false, showPredictionCommentPicker: false})
        } else {
            this.setState({showPredictionPicker: prediction._id, showPredictionCommentPicker: false})
        }
    }

    toggleShowPredictionCommentPicker(prediction, comment, event) {
        this.setState({showPredictionX: event.pageX, showPredictionY: event.pageY+5})
        if(this.state.showPredictionPicker == prediction._id) {
            this.setState({showPredictionPicker: false, showPredictionCommentPicker: false})
        } else {
            this.setState({showPredictionPicker: prediction._id, showPredictionCommentPicker: comment._id})
        }
    }

    hidePredictionPicker() {
        this.setState({showPredictionPicker: false, showPredictionCommentPicker: false})
    }

    addEmojiToPrediction(emoji, pred) {
        Actions.addPredictionReaction(pred._id, emoji)
    }

    addEmojiToComment(emoji, comment, pred) {
        Actions.addPredictionCommentReaction(pred._id, comment._id, emoji)
    }

    addPredictionReaction(emoji) {
        console.log(emoji)
        if(this.state.showPredictionCommentPicker) {
            Actions.addPredictionCommentReaction(this.state.showPredictionPicker, this.state.showPredictionCommentPicker, emoji)
        } else {
            Actions.addPredictionReaction(this.state.showPredictionPicker, emoji)
        }
        this.setState({showPredictionPicker: false, showPredictionCommentPicker: false})
    }

    removePredictionReaction(emoji) {
        Actions.removePredictionReaction(this.state.showPredictionPicker, emoji)
    }

    nextPage() {
        if(!this.props.location.search) {
            window.location.href = this.props.location.pathname + "?page=2"
        } else {
            let currentPage = parseInt(this.props.location.search.substr(this.props.location.search.indexOf("page")+5))
            let nextPage = currentPage + 1
            window.location.href = this.props.location.pathname + this.props.location.search.replace("page="+currentPage, "page="+nextPage)
        }
    }

    prevPage() {
        let currentPage = parseInt(this.props.location.search.substr(this.props.location.search.indexOf("page")+5))
        let nextPage = currentPage - 1
        window.location.href = this.props.location.pathname + this.props.location.search.replace("page="+currentPage, "page="+nextPage)
    }

    render() {
        console.log(this.state)
        let makePrediction
        const predictions = this.state.predictions.data.map((pred) => {
            if(!pred) {
                return (<div/>)
            }
            const awards = pred.awards && pred.awards.map((award) => {
                if(award == "thronesy") {
                    return (<div className="prediction-status-info prediction-award">🏆
                        <div className="prediction-status-box">This Valyrian Steel wager was determined to be extra thronesy. +25 coins!</div>
                    </div>)
                } else {
                    return(<div/>)
                }
            })
            const comments = pred.comments.map((comment) => {
                let commentDelete, commentCoins
                const commentReactions = (comment.reactions && comment.reactions.length > 0 && comment.reactions.map((reaction) => {
                    return (
                        <div onClick={this.addEmojiToComment.bind(this, reaction, comment, pred)} className="emoji-reaction" key={reaction.id}>
                            <Emoji emoji={reaction.id} size={14} set='emojione' />
                            <div className={"emoji-reaction-count "+ (reaction.usernames || "hidden")}>{reaction.usernames && reaction.usernames.length}</div>
                            <div className="emoji-reaction-user-box">{reaction.usernames && reaction.usernames.join(", ")}</div>
                        </div>
                    )
                })) || []
                if(comment.author == this.state.user.username && !comment.coins) {
                    commentDelete = (<a href="#" className="comment-box-delete fa fa-trash" onClick={this.deleteComment.bind(this, comment, pred)}/>)
                }
                if(comment.coins) {
                    return(
                        <div className="comment-and-wager-box comment-and-wager-coin-box">
                            <div className={"iron-coin " + (comment.authorHouse || "").toLowerCase().replace(/\s/, "-")}/>
                            <div className="wager-points">
                                <div>{comment.coins}</div>
                                <div>coins</div>
                            </div>
                            <div className="comment-wager-author">
                                <span className="author">Wagered by </span>
                                <a href={"/account/predictions/user/" + comment.author}>{comment.author}</a>
                            </div>
                            <div className={"reaction-box " + (commentReactions.length>0 && "reaction-box-displayed")}>
                                {commentReactions}
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div className="comment-and-wager-box">
                            <div className="comment-box" key={comment._id}>
                                <div className="comment-box-header">Comment by {comment.author}{commentDelete}</div>
                                <div>{comment.text}</div>
                            </div>
                            <div className={"reaction-box " + (commentReactions.length>0 && "reaction-box-displayed")}>
                                {commentReactions}
                                <div onClick={this.toggleShowPredictionCommentPicker.bind(this, pred, comment)} className="emoji-reaction add-emoji"><Emoji emoji="grinning" set="emojione" size={14} /></div>
                            </div>
                        </div>
                    );
                }
            })
            const tags = (pred.tags && pred.tags.map((tag) => {
                const tagImage = "/public/media/tag_images/"+tagImageHash[tag];

                return (
                    <div className="tag-image-container" key={Math.random().toString().substr(12)}>
                        <a href="#" onClick={this.searchPredictions.bind(this, tag)}>
                            <img className="tag-image" src={tagImage} />
                        </a>
                    </div>
                )
            })) || []
            const reactions = (pred.reactions && pred.reactions.length > 0 && pred.reactions.map((reaction) => {
                return (
                    <div onClick={this.addEmojiToPrediction.bind(this, reaction, pred)} className="emoji-reaction" key={reaction.id}>
                        <Emoji emoji={reaction.id} size={14} set='emojione' />
                        <div className={"emoji-reaction-count "+ (reaction.usernames || "hidden")}>{reaction.usernames && reaction.usernames.length}</div>
                        <div className="emoji-reaction-user-box">{reaction.usernames && reaction.usernames.join(", ")}</div>
                    </div>
                )
            })) || []
            return (
                <div className="prediction-container " key={pred._id}>
                    <div className= {"prediction-box " + (pred.authorHouse || "").toLowerCase().replace(/\s/, "-")}>
                        <div className={"prediction-box-details " + (pred.status == "rejected" && "prediction-box-details-rejected ") + (pred.status == "lost" && " prediction-box-details-false ") + (pred.status == "won" && " prediction-box-details-won")}>
                            {awards}
                            <div className="prediction">{pred.text}</div>
                            <div>
                                <span className="author">Predicted by </span>
                                <a href={"/account/predictions/user/" + pred.author}>{pred.author}</a>
                            </div>
                            <div className="reaction-box">
                                {reactions}
                                <div onClick={this.toggleShowPredictionPicker.bind(this, pred)} className="emoji-reaction add-emoji"><Emoji emoji="grinning" set="emojione" size={14} /></div>
                            </div>
                        </div>
                        <div className="prediction-box-footer">
                            <div className={"iron-coin " + (pred.authorHouse || "").toLowerCase().replace(/\s/, "-")}/>
                            <div className="wager-points">
                                <div>{pred.coins}</div>
                                <div>coins</div>
                            </div>
                            <div className="prediction-status-info">{pred.status}
                                <div className="prediction-status-box">{(pred.status == "pending" && "This prediction is not yet approved by the admin") ||
                                    (pred.status ==  "standing" && "Watch GoT to see if this prediction comes true") ||
                                    (pred.status ==  "rejected" && "This salt wager has been rejected.") ||
                                    (pred.status ==  "won" && "This has come true!") ||
                                    (pred.status ==  "lost" && "This has not come true.")
                                }</div>
                            </div>
                            {tags}
                        </div>
                    </div>
                    {comments}
                    <div className="comment-and-wager-box new-comment-and-wager-box">
                        <div className="comment-form-box">
                            <CommentForm onCommentSubmit={this.handleCommentSubmit} parentId={pred._id} {...this.state.details}/>
                        </div>
                        <div className={"double-down-box-clickable double-down-box " + ((pred.status=="pending" || pred.status=="standing") && !pred.locked && "double-down-box-visible")} onClick={this.showDoubleDown.bind(this, pred)}>
                            <div className="fa fa-plus"></div>
                            <div className="double-down-text">wager</div>
                        </div>
                        <div className={"double-down-box " + ((pred.status == "won" || pred.status == "lost" || pred.status == "rejected" || pred.locked) && "double-down-box-visible")}>
                            <div className="fa fa-lock"></div>
                            <div className="double-down-text">locked</div>
                        </div>
                        <div className={"double-down-popup " + (this.state.showPredictionDoubleDown == pred._id && " double-down-popup-visible")}>
                            <div className="popup-close fa fa-close" onClick={this.hideDoubleDown}></div>
                            <h3>Like this prediction?</h3>
                            <p>Place a wager on it. It's fine if it's from another house.</p>
                            <div className="form-group">
                                <label className="control-label">Coins to wager:</label>
                                <input className="form-control" type="number" value={this.state.doubleDownCoins} onChange={this.handleCoinChange.bind(this)} min="1"/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Place Your Wager" className="btn btn-primary" onClick={this.doubleDown.bind(this, pred)}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        if (!this.state.user.hydrated) {
            makePrediction = (<div>...</div>);
        } else if (this.state.user.availableCoins > 0) {
            makePrediction = (

                <div>
                    <h1>{this.state.user.availableCoins} coins</h1>
                    <p>are available to wager</p>
                    <Button inputClasses={{ 'btn-primary': true }} onClick={this.goToNewPrediction.bind(this)}>
                        Make a Prediction
                    </Button>
                </div>);
        } else {
            console.log(this.state.user)
            makePrediction = (<div>0 coins available to wager</div>);
        }

        let sideBarContext;
        let diesNextForUser;
        if (this.props.match.params.username && this.state.scopedUser.hydrated && this.state.scopedUser.house) {
            diesNextForUser = this.state.scopedUser.characters && this.state.scopedUser.characters.map((character)=>{
                return (<div>{character.name}</div>)
            })
            sideBarContext = (
                <div className="house-bankroll-container">
                    <div className={"house-bankroll "+ this.state.scopedUser.house.name.toLowerCase().replace(/\s/, "-")}>
                        <div>{this.props.match.params.username}</div>
                        <div>House {this.state.scopedUser.house.name}</div>
                        <img className="house-picker-image" src={"/public/media/tag_images/House-"+this.state.scopedUser.house.name+"-Main-Shield.png"} />
                        <div>{this.state.scopedUser.coins} coins banked</div>
                        <div className={(diesNextForUser && diesNextForUser.length>0) || " hidden"}> Dies next:
                            {diesNextForUser}
                        </div>
                    </div>
                </div>
            )
        } else if(this.props.match.params.username && this.state.scopedUser.hydrated && !this.state.scopedUser.house) {
            diesNextForUser = this.state.scopedUser.characters && this.state.scopedUser.characters.map((character)=>{
                return (<div>{character.name}</div>)
            })
            sideBarContext = (
                <div className="house-bankroll-container">
                    <div className="house-bankroll">
                        <div>{this.props.match.params.username}</div>
                        <div>[No House]</div>
                        <div>{this.state.scopedUser.coins} coins banked</div>
                        <div className={(diesNextForUser && diesNextForUser.length>0) || " hidden"}> Dies next:
                            {diesNextForUser}
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.match.params.house) {

        } else {
            sideBarContext = this.state.houseStats.data.map((house) => {
                return (
                    <div className="house-bankroll-container" key={house._id}>
                        <div className={"house-bankroll "+house.name.toLowerCase().replace(/\s/, "-")}>
                            <div className="house-bankroll-housename">{house.name}({house.userCount})</div>
                            <div>{house.numPredictions} open predictions</div>
                            <div>{house.coins} coins banked</div>
                            <div>{house.availableCoins} coins left to wager</div>
                        </div>
                    </div>
                );
            })
        }
        let pagination
        if (this.state.predictions.items && this.state.predictions.items.limit < this.state.predictions.items.total) {
            pagination = (
                <div className="pagination-arrows-container">
                    <a className={"pagination-arrow " + (this.state.predictions.items.begin > 1 || "hidden")} href="#" onClick={this.prevPage.bind(this)}>
                        <img src="/public/media/left-arrow.png"/>
                    </a>
                    <a className={"pagination-arrow " + (this.state.predictions.items.end < this.state.predictions.items.total || "hidden")} href="#" onClick={this.nextPage.bind(this)}>
                        <img src="/public/media/right-arrow.png"/>
                    </a>
                </div>
            )
        }
        // <Picker set='emojione' onClick={this.addEmoji} title='Pick your emoji…' emoji='point_up' style={{ position: 'absolute', bottom: '20px', right: '20px' }} />

        return (
            <section className="container">
                <div className={"emoji-picker-container "+(this.state.showPredictionPicker || " hidden")}>
                    <div onClick={this.hidePredictionPicker.bind(this)} className="popup-close fa fa-close" style={{ position: 'absolute', top: this.state.showPredictionY, left: this.state.showPredictionX + 320 }}/>
                    <Picker onClick={this.addPredictionReaction.bind(this)} set="emojione" style={{ position: 'absolute', top: this.state.showPredictionY, left: this.state.showPredictionX }}/>
                </div>

                <h1 className="page-header">
                    Game of Thrones Season 8
                </h1>
                <div className="row">
                    <div className="col-sm-9">
                        <div className="mobile-only">
                            {makePrediction}
                        </div>
                      {predictions}
                      {pagination}
                    </div>
                    <div className="col-sm-3">
                        <div className="desktop-only">
                            {makePrediction}
                        </div>
                        {sideBarContext}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = PredictionsPage;
