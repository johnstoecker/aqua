'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const CommentForm = require('../comment-form.jsx');
const LinkState = require('../../../../helpers/link-state');
const PropTypes = require('prop-types');
const TextControl = require('../../../../components/form/text-control.jsx');
const tagImageHash = require('../../../../../data/tag_hash.json');



class NewPredictionPage extends React.Component {
    constructor(props) {

        super(props);

        // Actions.getPredictions();

        this.state = Store.getState();
    }


    // TODO: figure out why this is giving error
    handleTextChange(event) {
        var text = event.target.value;
        this.setState({text: text});
        var words = text.split(" ");
        if(tagImageHash[words[words.length-1]]) {
            this.addTag(words[words.length-1]);
        } else if(words.length > 1 && tagImageHash[words[words.length-2] + " " + words[words.length-1]]) {
            this.addTag(words[words.length-2] + " " + words[words.length-1])
        }
    }

    addTag(tag) {
        var tags = this.state.prediction.tags.slice();
        if(tags.includes(tag)) {
            return;
        }
        tags.push(tag);
        this.setState({prediction: {tags: tags}})
    }

    handleSubmit(event) {
        event.preventDefault();
        // var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text) {
          return;
        }
        Actions.createPrediction({
            text: text,
            tags: this.state.prediction.tags
        })
    }

    render() {
        const tagImages = this.state.prediction.tags.map((tag) => {
            tag = "/public/media/tag_images/"+tagImageHash[tag];

            return (
                <div className="tag-image" key={tag}>
                    <img src={tag} />
                </div>
            );
        })
        return (
            <section className="container">
                <h1 className="page-header">
                    Wager Your Coin
                </h1>
                <div className="row">
                    <div className="col-sm-6">
                        <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleTextChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder="The Iron Throne will...."
                            />
                            <input type="submit" value="Post" />
                        </form>
                        <div className="tag-images-container">
                            {tagImages}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = NewPredictionPage;
