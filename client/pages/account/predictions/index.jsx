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

    render() {
        let makePrediction
        console.log(this.props)
        const predictions = this.state.predictions.data.map((pred) => {
            const comments = pred.comments.map((comment) => {
                let commentDelete
                if(comment.author == this.state.user.username) {
                    commentDelete = (<a href="#" className="comment-box-delete fa fa-trash" onClick={this.deleteComment.bind(this, comment, pred)}/>)
                }
                return (
                    <div className="comment-box" key={comment._id}>
                        <div className="comment-box-header">Comment by {comment.author}{commentDelete}</div>
                        <div>{comment.text}</div>
                    </div>
                );
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
                <div className="prediction-container" key={pred._id}>
                    <div className= {"prediction-box " + (pred.authorHouse || "").toLowerCase()}>
                        <div className="prediction-box-details">
                            <div className="prediction">{pred.text}</div>
                            <div>
                                <span className="author">Predicted by </span>
                                <a href={"/account/predictions/user/" + pred.author}>{pred.author}</a>
                            </div>
                        </div>
                        <div className="prediction-box-footer">
                            <div className="iron-coin" />
                            <div className="wager-points">
                                <div>{pred.coins}</div>
                                <div>coins</div>
                            </div>
                            <div>{pred.status}</div>
                            {tags}
                        </div>
                    </div>
                    {comments}
                    <div className="comment-box">
                        <CommentForm onCommentSubmit={this.handleCommentSubmit} parentId={pred._id} {...this.state.details}/>
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
                    are available to wager
                    <Button inputClasses={{ 'btn-primary': true }} onClick={this.goToNewPrediction.bind(this)}>
                        Make a Prediction
                    </Button>
                </div>);
        } else {
            console.log(this.state.user)
            makePrediction = (<div>0 coins available to wager</div>);
        }

        let sideBarContext;
        if (this.props.match.params.username && this.state.scopedUser.hydrated) {
            sideBarContext = (
                <div className="house-bankroll-container">
                    <div className={"house-bankroll "+ this.state.scopedUser.house.name.toLowerCase()}>
                        <div>{this.props.match.params.username}</div>
                        <div>House {this.state.scopedUser.house.name}</div>
                        <img className="house-picker-image" src={"/public/media/tag_images/House-"+this.state.scopedUser.house.name+"-Main-Shield.png"} />
                        <div>{this.state.scopedUser.coins} coins banked</div>
                    </div>
                </div>
            )
        } else if (this.props.match.params.house) {

        } else {
            sideBarContext = this.state.houseStats.data.map((house) => {
                return (
                    <div className="house-bankroll-container" key={house._id}>
                        <div className={"house-bankroll "+house.name.toLowerCase()}>
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
