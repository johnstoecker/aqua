'use strict';
const React = require('react');
// const Store = require('./store');
// const Actions = require('./actions')
// const PropTypes = require('prop-types');

class LeaderboardPage extends React.Component {
    constructor(props) {

        super(props);

        // Actions.getPredictions();

        // this.state = Store.getState();
    }

    render() {
        return (
            <section className="container">
                <h1 className="page-header">
                    The Iron Bank will have its due....will you??
                </h1>
            </section>
        );
    }
}


module.exports = LeaderboardPage;
