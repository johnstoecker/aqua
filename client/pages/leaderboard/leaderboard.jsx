'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');



class Leaderboard extends React.Component {
    constructor(props) {

        super(props);

        this.input = {};
        this.state = Store.getState();
        Actions.topUsers()
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
        const users = this.state.topUsers.data.map((user) => {
            return (
                <div className="prediction-container" key={user._id}>
                    <div className= {"prediction-box " + (user.house && user.house.name || "").toLowerCase().replace(/\s/, "-")}>
                        <div className="prediction-box-footer">
                            <div className={"iron-coin " + (user.house && user.house.name || "").toLowerCase().replace(/\s/, "-")}/>
                            <div className="wager-points">
                                <div>{user.coins}</div>
                                <div>coins</div>
                            </div>
                            <div>{user.username}</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6
                </h1>
                <div className="row">
                    <div className="col-sm-9">
                      {users}
                    </div>
                </div>
            </section>
        );

    }
}


module.exports = Leaderboard;
