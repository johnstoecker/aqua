'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('./comment-form.jsx');
const Button = require('../../../components/form/button.jsx');
const tagImageHash = require('../../../../data/tag_hash.json');


class PredictionsPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getPredictions();
        // TODO: figure out a way to share user between pages
        Actions.getUser();

        this.state = Store.getState();
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

    handleCommentSubmit(id, newComment) {
        console.log(id)
        console.log(newComment)
        console.log(this.state);
        // this.state.predictions.data[0].comments.push(newComment);
        // this.state.predictions[0].comments.push(newComment);
        Actions.addComment(id, newComment);
    }

    goToNewPrediction() {
        this.props.history.push('/account/predictions/new');
    }

    addPrediction(state) {
        console.log("make a prediction")
    }

    addCharacter(character) {
        console.log(this.state)
        console.log(character)
        // console.log(Store.getState());
        if (this.state.throneTeamDetails.error == "Not Found") {
          this.state.throneTeamDetails = {
              characters: [character]
          }
          Actions.createThroneTeam(this.state.throneTeamDetails);
        } else {
          this.state.throneTeamDetails.characters.push(character);
          Actions.updateThroneTeam(this.state.throneTeamDetails);
        }
    }


    // toggleHideAddCharacter() {
    //     this.setState({hideAddCharacter: true})
    // }

    render() {
        let actions
        console.log(this.state)
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
                tag = "/public/media/tag_images/"+tagImageHash[tag];

                return (
                    <div className="tag-image-container" key={Math.random().toString().substr(2)}>
                        <img className="tag-image" src={tag} />
                    </div>
                )
            })) || []
            console.log(tags)
            return (
                <div key={pred._id}>
                    <div className="prediction-box">
                        <div className="prediction-box-details">
                            <div className="prediction">{pred.text}</div>
                            <div className="author">Predicted by {pred.author}</div>
                        </div>
                        <div className="prediction-box-footer">
                            <div className="iron-coin" />
                            <div className="wager-points">
                                <div>{pred.coins}</div>
                                <div>pts</div>
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
        })
        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6
                    <Button inputClasses={{ 'btn-primary': true }} onClick={this.goToNewPrediction.bind(this)}>
                          Make a Prediction
                    </Button>
                </h1>
                <div className="row">
                    <div className="col-sm-8">
                      {predictions}
                      {actions}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = PredictionsPage;
