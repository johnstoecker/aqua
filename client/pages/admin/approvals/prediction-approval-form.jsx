'use strict';
const Actions = require('./actions');
// const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
// const ControlGroup = require('../../../components/form/control-group.jsx');
const LinkState = require('../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
// const Spinner = require('../../../components/form/spinner.jsx');
// const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    error: PropTypes.string,
    hasError: PropTypes.object,
    help: PropTypes.object,
    hydrated: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string,
    showSaveSuccess: PropTypes.bool
};


class PredictionApprovalForm extends React.Component {
    constructor(props) {

        super(props);
        // this.state = {
        //     text: ""
        // };
    }

    componentWillReceiveProps(nextProps) {
        console.log("next props")
        // this.setState({
        //     name: nextProps.name
        // });
    }

    handleTextChange(event) {
        console.log(event);
    }

    approvePrediction() {
        console.log('approved')
        Actions.updatePrediction({_id: this.props._id, status: 'standing'})
    }

    denyPrediction() {
        console.log('denied')
        Actions.updatePrediction({_id: this.props._id, status: 'rejected'})
    }
    truePrediction() {
        console.log('true')
        Actions.updatePrediction({_id: this.props._id, status: 'won'})
    }

    falsePrediction() {
        console.log('false')
        Actions.updatePrediction({_id: this.props._id, status: 'lost'})
    }

    handleSubmit(event) {

        event.preventDefault();
        // var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text) {
          return;
        }
        this.props.onCommentSubmit(this.props.parentId, {text: text});
        this.setState({text: ''});

        // event.preventDefault();
        // event.stopPropagation();
        //
        // Actions.saveDetails({
        //     name: this.state.name
        // });
    }

    render() {

        let form
        if(this.props.status == 'pending') {
            form = (
                <div className="prediction-approval-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div>{this.props.text}</div>
                    <Button type="submit" onClick={this.approvePrediction.bind(this)}>Approve</Button>
                    <Button type="submit" onClick={this.denyPrediction.bind(this)}>Deny</Button>
                </div>
            )
        } else if(this.props.status == 'standing') {
            form = (
                <div className="prediction-approval-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div>{this.props.text}</div>
                    <Button type="submit" onClick={this.truePrediction.bind(this)}>True</Button>
                    <Button type="submit" onClick={this.falsePrediction.bind(this)}>False</Button>
                </div>
            )
        } else {
            form = (<div>nothing</div>)
            // TODO: update true/false predictions if they become false/true?
        }

        return (<div>{form}
            </div>
        );
    }
}

PredictionApprovalForm.propTypes = propTypes;


module.exports = PredictionApprovalForm;
