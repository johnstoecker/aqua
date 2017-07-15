'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class SplashPage extends React.Component {
    render() {

        return (
            <Layout
                title="About us"
                activeTab="about">

                <div className="row">
                    <div className="col-sm-10">
                        <h1 className="page-header">Praise for Iron Wagers</h1>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">My Brother</h4>
                                <p>
                                    Hey I'm getting 404's is the site down?
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
                                <h4 className="media-heading">My Mom</h4>
                                <p>
                                    Oh that's nice that you're keeping busy
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
                                <h4 className="media-heading">My Supervisor</h4>
                                <p>
                                    It's....so great...that you are....learning from this project
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
                                <h4 className="media-heading">Eric Marberg</h4>
                                <p>
                                    It looks like a lot of fun but it isn't
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = SplashPage;
