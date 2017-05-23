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
        console.log("next props")
        // this.setState({
        //     name: nextProps.name
        // });
    }

    handleTextChange(event) {
        console.log(event);
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

        // if (!this.props.hydrated) {
        //     return (
        //         <div className="alert alert-info">
        //             Loading contact info data...
        //         </div>
        //     );
        // }
        //
        // const alerts = [];

        // if (this.props.showSaveSuccess) {
        //     alerts.push(<Alert
        //         key="success"
        //         type="success"
        //         onClose={Actions.hideDetailsSaveSuccess}
        //         message="Success. Changes have been saved."
        //     />);
        // }
        //
        // if (this.props.error) {
        //     alerts.push(<Alert
        //         key="danger"
        //         type="danger"
        //         message={this.props.error}
        //     />);
        // }
        // <input type="text" placeholder="Add a comment" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>

        return (
            <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                <TextControl
                    name="text"
                    value={this.state.text}
                    onChange={LinkState.bind(this)}
                    disabled={this.props.loading}
                    placeholder="leave a comment"
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

CommentForm.propTypes = propTypes;


module.exports = CommentForm;
