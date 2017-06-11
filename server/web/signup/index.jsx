'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class SignupPage extends React.Component {
    render() {
        const neck = <script src='https://www.google.com/recaptcha/api.js'></script>;
        const feet = <script src="/public/pages/signup.min.js"></script>;

        return (
            <Layout
                title="Sign up"
                neck={neck}
                feet={feet}
                activeTab="signup">

                <div className="row">
                    <div className="col-sm-6" id="app-mount"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Iron Wagers</h1>
                        <p className="lead">
                            A game of thronesy predictions
                        </p>
                        <img className="signup-logo" src="/public/media/transparent-logo.png" />
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = SignupPage;
