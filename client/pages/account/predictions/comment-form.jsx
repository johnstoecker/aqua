'use strict';
const Actions = require('./actions');
// const Alert = require('../../../components/alert.jsx');
// const Button = require('../../../components/form/button.jsx');
// const ControlGroup = require('../../../components/form/control-group.jsx');
const LinkState = require('../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
// const Spinner = require('../../../components/form/spinner.jsx');
const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    error: PropTypes.string,
    hasError: PropTypes.object,
    help: PropTypes.object,
    hydrated: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string,
    showSaveSuccess: PropTypes.bool
};


class CommentForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            text: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     name: nextProps.name
        // });
    }

    handleTextChange(event) {
        console.log(event);
    }

    handleSubmit(event) {


        event.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
          return;
        }
        this.props.onCommentSubmit(this.props.parentId, {text: text});
        this.setState({text: ''});

    }

    render() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                <TextControl
                    name="text"
                    value={this.state.text}
                    onChange={LinkState.bind(this)}
                    disabled={this.props.loading}
                    placeholder="leave a comment"
                />

            </form>
        );
    }
}

CommentForm.propTypes = propTypes;


module.exports = CommentForm;
