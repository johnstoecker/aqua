'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const PredictionApprovalForm = require('./prediction-approval-form.jsx');

class ApprovalsPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getPendingPredictions();

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

    showPending() {
        Actions.getPendingPredictions();
    }

    showStanding() {
        Actions.getStandingPredictions();
    }

    // toggleHideAddCharacter() {
    //     this.setState({hideAddCharacter: true})
    // }

    render() {
        console.log(this.state)
        const predictions = this.state.predictions.data.map((pred) => {
            return (
                <PredictionApprovalForm {...pred}/>
                    // <CommentForm onCommentSubmit={this.handleCommentSubmit} parentId={pred._id} {...this.state.details}/>
            )
        });
        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6 Prediction Approval
                </h1>
                <button onClick={this.showPending.bind(this)}>Show Pending</button>
                <button onClick={this.showStanding.bind(this)}>Show Standing</button>
                <div className="row">
                    <div className="col-sm-8">
                      {predictions}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = ApprovalsPage;
