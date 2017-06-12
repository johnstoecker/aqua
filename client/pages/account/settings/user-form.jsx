'use strict';
const Actions = require('./actions');
const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
const ControlGroup = require('../../../components/form/control-group.jsx');
const LinkState = require('../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');
const TextControl = require('../../../components/form/text-control.jsx');


const propTypes = {
    email: PropTypes.string,
    error: PropTypes.string,
    hasError: PropTypes.object,
    help: PropTypes.object,
    hydrated: PropTypes.bool,
    loading: PropTypes.bool,
    showSaveSuccess: PropTypes.bool,
    username: PropTypes.string
};


class UserForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            username: props.username,
            email: props.email
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            username: nextProps.username,
            email: nextProps.email
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.saveUser({
            username: this.state.username,
            email: this.state.email
        });
    }

    render() {

        if (!this.props.hydrated) {
            return (
                <div className="alert alert-info">
                    Loading identity data...
                </div>
            );
        }

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<Alert
                key="success"
                type="success"
                onClose={Actions.hideUserSaveSuccess}
                message="Success. Changes have been saved."
            />);
        }

        if (this.props.error) {
            alerts.push(<Alert
                key="danger"
                type="danger"
                message={this.props.error}
            />);
        }

                return (
            <div>
                {alerts}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="text"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleTextChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder="Enter your prediction"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Coins:
                            </label>
                            <input
                                type="number"
                                name="number"
                                value={this.state.coins}
                                onChange={this.handleCoinChange.bind(this)}
                                disabled={this.props.loading}
                                placeholder='10'
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Post" className="btn btn-primary"/>
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

UserForm.propTypes = propTypes;


module.exports = UserForm;
