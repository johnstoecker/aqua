'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class AboutPage extends React.Component {
    render() {

        return (
            <Layout
                title="About us"
                activeTab="about">

                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">About us</h1>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">John Stoecker</h4>
                                <p>
                                    Spends most of his time on various hype trains.
                                    Thinks the show is better than the books.
                                </p>
                            </div>
                        </div>
                        <div className="media text-right">
                            <div className="pull-right">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">Kit Richert</h4>
                                <p>
                                    Excited about season 7.
                                    Can't wait to create more GOT-themed Christmas Carols.
                                </p>
                            </div>
                        </div>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">3rd Team Member?</h4>
                                <p>
                                    Contribute to <a href="https://github.com/johnstoecker/ironwagers"> our github</a> and oooweee, this could be *you*
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">Contact</h1>
                        <p>
                            <a href="https://twitter.com/ironwagers">@ironwagers</a>
                        </p>
                        <p>
                            <a href="https://github.com/johnstoecker/ironwagers">ironwagers on github</a>
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = AboutPage;
