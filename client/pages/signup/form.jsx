'use strict';
const Actions = require('./actions');
const Alert = require('../../components/alert.jsx');
const Button = require('../../components/form/button.jsx');
const ControlGroup = require('../../components/form/control-group.jsx');
const React = require('react');
const Spinner = require('../../components/form/spinner.jsx');
const Store = require('./store');
const TextControl = require('../../components/form/text-control.jsx');


class Form extends React.Component {
    constructor(props) {

        super(props);

        this.input = {};
        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

        if (this.input.email) {
            this.input.email.focus();
        }
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        Actions.sendRequest({
            username: this.input.username.value(),
            password: this.input.password.value(),
            email: this.input.email.value(),
            recaptcha: grecaptcha.getResponse()
        });
    }

    render() {

        let alert = [];

        if (this.state.success) {
            alert = <Alert
                type="success"
                message="Success. Redirecting..."
            />;
        }
        else if (this.state.error) {
            alert = <Alert
                type="danger"
                message={this.state.error}
            />;
        }

        let formElements;

        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    ref={(c) => (this.input.email = c)}
                    name="email"
                    label="Email"
                    hasError={this.state.hasError.email}
                    help={this.state.help.email}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.username = c)}
                    name="username"
                    label="Username (GoT puns recommended, but not required)"
                    hasError={this.state.hasError.username}
                    help={this.state.help.username}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.password = c)}
                    name="password"
                    label="Password"
                    type="password"
                    hasError={this.state.hasError.password}
                    help={this.state.help.password}
                    disabled={this.state.loading}
                />
                <div className="g-recaptcha" data-sitekey="6LdP9SMUAAAAAA1riPaEvWQfLUSjdlP-TBJsZb4b"></div>
                <br/>
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.state.loading}>

                        Create my account
                        <Spinner space="left" show={this.state.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }
        return (
            <section>
                <h1 className="page-header">Sign up</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {alert}
                    {formElements}
                </form>
            </section>
        );
    }
}


module.exports = Form;
