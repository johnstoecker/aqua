'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class ContactPage extends React.Component {
    render() {

        const feet = <script src="/public/pages/contact.min.js"></script>;

        return (
            <Layout
                title="Contact us"
                feet={feet}
                activeTab="contact">

                <div className="row">
                    <div className="col-sm-6" id="app-mount"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Contact us</h1>
                        <p className="lead">
                            The Iron Bank will have its email.
                        </p>
                        <i className="fa fa-reply-all bamf"></i>
                        <div>
                            San Francisco, CA, Braavos, Essos
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = ContactPage;
