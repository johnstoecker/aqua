'use strict';
const Layout = require('../layouts/default.jsx');
const Package = require('../../../package.json');
const React = require('react');


class HomePage extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            img: Math.round(Math.random()*2)
        }
    }


    render() {
        let src;
        if (this.state.img == 0) {
            src = "/public/media/iron_wagers_figurines.jpg"
        } else {
            src = "http://media-cache-ak0.pinimg.com/736x/1b/16/98/1b169875c1952cf4272eb245fee48add.jpg"
        }
        const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

          // re-add this below image on new season
          // <h2>
          //     <a className="btn btn-primary btn-lg" href="/signup">
          //         Create an account
          //     </a>
          //     &nbsp;&nbsp;
          //     <a className="btn btn-primary btn-success btn-lg" href="/login">
          //         Sign In
          //     </a>
          // </h2>


        return (
            <Layout
                title="Iron Wagers"
                neck={neck}
                activeTab="home">

                <div className="jumbotron">
                    <h2>THE IRON BANK WILL HAVE ITS DUE</h2>
                    <h2>
                        <img className="max-hundred max-height-screen" src={src} />
                    </h2>
                    Iron Wagers will continue next year in season 8. In the meantime, check out last year's <a href="/leaderboard">leaderboard</a>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <p>
                                    A weekly game of thronesy predictions
                                </p>
                                <a href="/intro" className="btn btn-default btn-block">
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <p>
                                    Wagerers of salt, wagerers of iron
                                </p>
                                <a href="/leaderboard" className="btn btn-default btn-block">
                                    Leaderboard
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
