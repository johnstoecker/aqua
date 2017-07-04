'use strict';
const React = require('react');
const Leaderboard = require('../../leaderboard/leaderboard')

class AccountLeaderboardPage extends React.Component {
    constructor(props) {

        super(props);
    }

    render() {
        return (
            <Leaderboard/>
        );
    }
}


module.exports = AccountLeaderboardPage;
