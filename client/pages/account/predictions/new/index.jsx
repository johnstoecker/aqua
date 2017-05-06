'use strict';
const React = require('react');
// const Store = require('./store');
// const Actions = require('./actions')
// const CommentForm = require('./comment-form.jsx');
// const Button = require('../../../components/form/button.jsx');


class NewPredictionPage extends React.Component {
    constructor(props) {

        super(props);

        // Actions.getPredictions();

        // this.state = Store.getState();
    }

    render() {
        return (
            <section className="container">
                <h1 className="page-header">
                    Wager Your Coin
                </h1>
                <div className="row">
                    <div className="col-sm-6">
                        [make ur prediction here yo]
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = NewPredictionPage;
