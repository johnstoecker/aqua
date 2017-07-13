'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const Store = require('./store');
const Actions = require('./actions');
const CommentForm = require('../comment-form.jsx');
const LinkState = require('../../../../helpers/link-state');
// const TextControl = require('../../../../components/form/text-control.jsx');
const tagImageHash = require('../../../../../data/tag_hash.json');
//
//
//
const Alert = require('../../../../components/alert.jsx');
// const Button = require('../../../components/form/button.jsx');
// const ControlGroup = require('../../../components/form/control-group.jsx');
const Spinner = require('../../../../components/form/spinner.jsx');
// const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    error: PropTypes.string,
    hasError: PropTypes.object,
    help: PropTypes.object,
    hydrated: PropTypes.bool,
    loading: PropTypes.bool,
    text: PropTypes.string,
    coins: PropTypes.number,
    tags: PropTypes.array,
    showSaveSuccess: PropTypes.bool
};


class PredictionForm extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            text: props.text,
            coins: props.coins,
            tags: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            text: nextProps.text
        });
    }

    // TODO: figure out why this is giving error
    handleTextChange(event) {
        var text = event.target.value;
        this.setState({text: text});

        var words = text.toLowerCase().split(" ");
        var previousWord = null
        var newTags = []
        for (var i=0; i<words.length; i++) {
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
        // TODO: max coinage set to available coins
        this.setState({coins: event.target.value});
    }

    setTags(tags) {
        this.setState({tags: tags})
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        var text = this.state.text.trim();
        if (!text) {
          return;
        }
        Actions.createPrediction({
            text: text,
            tags: this.state.tags,
            coins: this.state.coins
        })
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        const alerts = [];
        if (this.props.showSaveSuccess) {
            alerts.push(<Alert
                key="success"
                type="success"
                onClose={Actions.hideDetailsSaveSuccess}
                message="Your prediction has been created."
                link="/account/predictions"
            />);
        }

        if (this.props.hasError) {
            alerts.push(<Alert
                key="danger"
                type="danger"
                message={this.props.error.message}
            />);
        }

        const tagImages = this.state.tags.map((tag) => {
            tag = "/public/media/tag_images/"+tagImageHash[tag];

            return (
                <div className="tag-image" key={tag}>
                    <img className="tag-image-src" src={tag} />
                </div>
            );
        })

        return (
            <div>
                {alerts}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        <div className="form-group">
                        <label className="control-label">
                                Your Prediction:
                            </label>
                            <input
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleTextChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder="Be as detailed as you like"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Coins to Wager:
                            </label>
                            <input
                                type="number"
                                name="number"
                                value={this.state.coins}
                                onChange={this.handleCoinChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder='10'
                                className="form-control"
                                min="1"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Place Your Wager" className="btn btn-primary"/>
                        </div>
                        <Spinner space="left" show={this.props.loading} />

                    </fieldset>
                </form>
                <div className="tag-images-container">
                    {tagImages}
                </div>
            </div>
        );
    }
}

PredictionForm.propTypes = propTypes;


module.exports = PredictionForm;
