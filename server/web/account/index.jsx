'use strict';
const Layout = require('../layouts/plain.jsx');
const React = require('react');


class AccountPage extends React.Component {
    render() {

        const neck = [
            <link key="layout" rel="stylesheet" href="/public/layouts/default.min.css" />,
            <link key="page" rel="stylesheet" href="/public/pages/account.min.css" />,
            <link rel="stylesheet" href="/public/pages/components.min.css" />,
            <link rel="stylesheet" href="/public/pages/emoji-mart.min.css" />,
            <script async defer src="https://buttons.github.io/buttons.js"></script>
        ];
        const feet = <script src="/public/pages/account.min.js"></script>;

        return (
            <Layout
                title="Iron Wagers"
                neck={neck}
                feet={feet}>

                <div id="app-mount"></div>
            </Layout>
        );
    }
}


module.exports = AccountPage;
