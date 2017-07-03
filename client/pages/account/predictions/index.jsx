'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('./comment-form.jsx');
const Button = require('../../../components/form/button.jsx');
const tagImageHash = require('../../../../data/tag_hash.json');
const Houses = require('../../../../data/houses.json');


class PredictionsPage extends React.Component {
    constructor(props) {

        super(props);
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
        } else if (props.match.params.house) {
            params.house = props.match.params.house
        }

        Actions.getPredictions(params);
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

    searchPredictions(tag) {
        Actions.getPredictions({text: tag})
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

    render() {
        console.log(this.state)
        let makePrediction
        const predictions = this.state.predictions.data.map((pred) => {
            const comments = pred.comments.map((comment) => {
                let commentDelete, commentCoins
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
            return (
                <div className="prediction-container " key={pred._id}>
                    <div className= {"prediction-box " + (pred.authorHouse || "").toLowerCase().replace(/\s/, "-")}>
                        <div className={"prediction-box-details " + (pred.status == "rejected" && "prediction-box-details-rejected ") + (pred.status == "lost" && " prediction-box-details-false")}>
                            <div className="prediction">{pred.text}</div>
                            <div>
                                <span className="author">Predicted by </span>
                                <a href={"/account/predictions/user/" + pred.author}>{pred.author}</a>
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
                    <div className="comment-and-wager-box">
                        <div className="comment-form-box">
                            <CommentForm onCommentSubmit={this.handleCommentSubmit} parentId={pred._id} {...this.state.details}/>
                        </div>
                        <div className={"double-down-box " + ((pred.status=="pending" || pred.status=="standing") && "double-down-box-visible")} onClick={this.showDoubleDown.bind(this, pred)}>
                            <div className="fa fa-plus"></div>
                            <div className="double-down-text">wager</div>
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
        if (this.props.match.params.username && this.state.scopedUser.hydrated && this.state.scopedUser.house) {
            sideBarContext = (
                <div className="house-bankroll-container">
                    <div className={"house-bankroll "+ this.state.scopedUser.house.name.toLowerCase().replace(/\s/, "-")}>
                        <div>{this.props.match.params.username}</div>
                        <div>House {this.state.scopedUser.house.name}</div>
                        <img className="house-picker-image" src={"/public/media/tag_images/House-"+this.state.scopedUser.house.name+"-Main-Shield.png"} />
                        <div>{this.state.scopedUser.coins} coins banked</div>
                    </div>
                </div>
            )
        } else if(this.props.match.params.username && this.state.scopedUser.hydrated && !this.state.scopedUser.house) {
            sideBarContext = (
                <div className="house-bankroll-container">
                    <div className="house-bankroll">
                        <div>{this.props.match.params.username}</div>
                        <div>[No House]</div>
                        <div>{this.state.scopedUser.coins} coins banked</div>
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

        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6
                </h1>
                <div className="row">
                    <div className="col-sm-9">
                      {predictions}
                    </div>
                    <div className="col-sm-3">
                        {makePrediction}
                        {sideBarContext}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = PredictionsPage;
