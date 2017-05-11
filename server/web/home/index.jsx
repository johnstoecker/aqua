'use strict';
const Layout = require('../layouts/default.jsx');
const Package = require('../../../package.json');
const React = require('react');


class HomePage extends React.Component {
    render() {

        const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

        return (
            <Layout
                title="Iron Wagers"
                neck={neck}
                activeTab="home">

                <div className="jumbotron">
                    <h2>THE IRON BANK WILL HAVE ITS DUE</h2>
                    <h2>
                        <img src="http://media-cache-ak0.pinimg.com/736x/1b/16/98/1b169875c1952cf4272eb245fee48add.jpg" />
                        <h2>
                            <a className="btn btn-primary btn-lg" href="/signup">
                                Create an account
                            </a>
                            &nbsp;&nbsp;
                            <a className="btn btn-success btn-lg" href="/login">
                                Sign In
                            </a>
                        </h2>
                    </h2>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>About us</h3>
                                <p>
                                    John and Kit are GOT superfans.
                                </p>
                                <a href="/about" className="btn btn-default btn-block">
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Contact us</h3>
                                <p>
                                    <a href="https://twitter.com/ironwagers">@ironwagers</a>, <a href="https://reddit.com/r/ironwagers">r/ironwagers</a>, or email below
                                </p>
                                <a href="/contact" className="btn btn-default btn-block">
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = HomePage;
