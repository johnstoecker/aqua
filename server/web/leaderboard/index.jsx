'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');

class LeaderboardPage extends React.Component {
    render() {
        const neck = [
            <link rel="stylesheet" href="/public/pages/components.min.css" />,
            <link key="layout" rel="stylesheet" href="/public/layouts/default.min.css" />,
            <link key="page" rel="stylesheet" href="/public/pages/account.min.css" />,
        ];

        const feet = <script src="/public/pages/leaderboard.min.js"></script>;

        return (
            <Layout
                title="Iron Wagers"
                neck={neck}
                feet={feet}>

                <div className="col-sm-6" id="app-mount"></div>
            </Layout>


        );
    }
}


module.exports = LeaderboardPage;
