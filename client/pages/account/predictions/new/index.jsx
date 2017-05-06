'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('../comment-form.jsx');
const LinkState = require('../../../../helpers/link-state');
const PropTypes = require('prop-types');
const TextControl = require('../../../../components/form/text-control.jsx');




class NewPredictionPage extends React.Component {
    constructor(props) {

        super(props);

        // Actions.getPredictions();

        this.state = Store.getState();
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
        console.log(text)
        Actions.createPrediction({
            text: text
        })
        // this.props.onCommentSubmit(this.props.parentId, {text: text});
        // this.setState({text: ''});
    }

    render() {
        return (
            <section className="container">
                <h1 className="page-header">
                    Wager Your Coin
                </h1>
                <div className="row">
                    <div className="col-sm-6">
                        <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                            <TextControl
                                name="text"
                                value={this.state.text}
                                onChange={LinkState.bind(this)}
                                disabled={this.props.loading}
                                placeholder="The Iron Throne will...."
                            />
                            <input type="submit" value="Post" />
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = NewPredictionPage;
