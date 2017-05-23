'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('./comment-form.jsx');
const Button = require('../../../components/form/button.jsx');
const tagImageHash = require('../../../../data/tag_hash.json');


class ApprovalsPage extends React.Component {
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
        console.log(this.state)
        const predictions = this.state.predictions.data.map((pred) => {
            <PredictionApproval {pred}/>
        });
        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6 Prediction Approbal
                </h1>
                <div className="row">
                    <div className="col-sm-8">
                      {predictions}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = PredictionsPage;
