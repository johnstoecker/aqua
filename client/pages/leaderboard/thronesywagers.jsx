'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');



class ThronesyWagers extends React.Component {
    constructor(props) {

        super(props);

        this.input = {};
        this.state = Store.getState();
        Actions.thronesyPredictions()
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

    goToPrediction(id) {
        window.location.href = "/account/predictions/?id="+ id
    }

    render() {
        console.log(this.state)
        const predictions = this.state.thronesyPredictions.data.map((pred) => {
            const awards = pred.awards && pred.awards.map((award) => {
                if(award == "thronesy") {
                    return (<div className="prediction-award-on-small">🏆</div>)
                } else {
                    return(<div/>)
                }
            })
            let won
            if(pred.status == "won"){
                won = (<div className="prediction-award-on-small">💰</div>)
            }
            return (
                <div href="#" onClick={this.goToPrediction.bind(this, pred._id)} className="prediction-container hover-zoom" key={pred._id}>
                    {awards}
                    {won}
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


module.exports = ThronesyWagers;
