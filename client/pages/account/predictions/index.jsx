'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('./comment-form.jsx');

class PredictionsPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getPredictions();

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

    handleCommentSubmit(id, newComment) {
        console.log(id)
        console.log(newComment)
        console.log(this.state);
        // this.state.predictions.data[0].comments.push(newComment);
        // this.state.predictions[0].comments.push(newComment);
        Actions.addComment(id, newComment);
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
        let publicPredictions
        let actions
        console.log(this.state)
        const predictions = this.state.predictions.data.map((pred) => {
            console.log(pred)
            const comments = pred.comments.map((comment) => {
                return (
                    <div className="comment-box" key={comment._id}>
                        <div>Comment by {comment.author}</div>
                        <div>{comment.text}</div>
                    </div>
                );
            })
            // {comments}
            // onCommentSubmit={this.handleCommentSubmit}
            // <CommentForm />

            return (
                <div key={pred._id}>
                    <div className="prediction-box">
                        <div className="prediction-box-details">
                            <div>{pred.text}</div>
                            <div>Predicted by {pred.author}</div>
                        </div>
                        <div className="prediction-box-footer">
                            <div className="iron-coin" />
                            <div className="wager-points">15 pts</div>
                            <div>{pred.status}</div>
                        </div>
                    </div>
                    {comments}
                    <CommentForm onCommentSubmit={this.handleCommentSubmit} parentId={pred._id} {...this.state.details}/>
                </div>
            );
        })
        return (
            <section className="container">
                <h1 className="page-header">Predictions Season 6</h1>
                <div className="xxxasdf"></div>
                <div className="row">
                    <div className="col-sm-6">
                      {predictions}
                      {actions}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = PredictionsPage;
