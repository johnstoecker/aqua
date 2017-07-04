'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');



class TopWagers extends React.Component {
    constructor(props) {

        super(props);

        this.input = {};
        this.state = Store.getState();
        Actions.topPredictions()
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {
        console.log(this.state)
        const predictions = this.state.topPredictions.data.map((pred) => {
            return (
                <div className="prediction-container" key={pred._id}>
                    <div className= {"prediction-box " + (pred.authorHouse || "").toLowerCase().replace(/\s/, "-")}>
                        <div className="prediction-box-footer">
                            <div className={"iron-coin " + (pred.authorHouse || "").toLowerCase().replace(/\s/, "-")}/>
                            <div className="wager-points">
                                <div>{pred.coins}</div>
                                <div>coins</div>
                            </div>
                            <div>{pred.text}</div>
                            <div className="leaderboard-swing-right">
                                <span className="author">Predicted by </span>
                                <span>{pred.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
              {predictions}
          </div>
        );

    }
}


module.exports = TopWagers;
