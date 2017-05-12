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

        this.state = Store.getState();
    }

    // TODO: figure out why this is giving error
    handleTextChange(event) {
        var text = event.target.value;
        this.setState({text: text});

        var words = text.toLowerCase().split(" ");
        var previousWord = null
        var newTags = []
        for (var i=0; i<words.length; i++) {
            console.log(i);
            if(tagImageHash[words[i]] && !newTags.includes(words[i])) {
                newTags.push(words[i]);
            } else if(previousWord != null && tagImageHash[previousWord + " " + words[i]] && !newTags.includes(previousWord + " " + words[i])) {
                newTags.push(previousWord + " " + words[i])
            }
            previousWord = words[i];
        }
        this.setTags(newTags)
    }

    handleCoinChange(event) {
        console.log(event)
        this.setState({coins: event.target.value});
    }

    setTags(tags) {
        this.setState({prediction: {tags: tags}})
    }

    handleSubmit(event) {
        event.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
          return;
        }
        Actions.createPrediction({
            text: text,
            tags: this.state.prediction.tags,
            coins: this.state.coins
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
                    <div className="col-sm-8">
                    <p>Will Arya and Sansa reunite?  Will Bran fight the Night King as a warg?  What depravity will George R.R. Martin show us this season? If you have a hunch, write down each prediction for season 7 and wager points on how sure you are.  If others agree, they might just wager some of their coins too.  If not, they may troll you in the comments section.  The night is dark and full of terrors. </p>
                        <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleTextChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder="Enter your prediction"
                            />
                            Coins:
                            <input
                                type="number"
                                name="number"
                                value={this.state.coins}
                                onChange={this.handleCoinChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder='10'
                            />
                            <input type="submit" value="Post" />
                        </form>
                        <div className="tag-images-container">
                            {tagImages}
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-3 rules">
                        Rules of Engagement
                        <ul>
                        <li>Each player has 100 coin to bet</li>
                        <li>Write predictions for GoT Season 7</li>
                        <li>Add a bet to each prediction</li>
                        <li>Bet coin on others predictions</li>
                        <li>Heckle</li>
                        <li>Get heckled</li>
                        <li>If the thing happens, coins go to your bank</li>
                        <li>Biggest bank roll at the end wins</li>
                        <li>There are no real winners in GoT</li>
                        </ul>
                   </div>
                </div>
            </section>
        );
    }
}

module.exports = NewPredictionPage;
