'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');
const TopWagers = require('./topwagers')


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

    goToUserPredictions(username) {
        window.location.href = "/account/predictions/user/"+ username
    }

    showTab(tab) {
        this.setState({showTab: tab})
    }

    render() {
        const users = this.state.topUsers.data.map((user) => {
            if (user.username == "root") {
                return (<div/>)
            } else {
            return (
                <div href="#" onClick={this.goToUserPredictions.bind(this, user.username)} className="prediction-container hover-zoom" key={user._id}>
                    <div className= {"prediction-box " + (user.house && user.house.name || "").toLowerCase().replace(/\s/, "-")}>
                        <div className="prediction-box-footer">
                            <div className={"iron-coin " + (user.house && user.house.name || "").toLowerCase().replace(/\s/, "-")}/>
                            <div className="wager-points">
                                <div>{user.coins}</div>
                                <div>coins</div>
                            </div>
                            <div>{user.username}</div>
                            <div className="leaderboard-swing-right">
                                <span>{user.house && user.house.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );}
        });

        return (
            <section className="container">
                <h1 className="page-header">
                    Wagers of Salt, Wagers of Iron
                </h1>
                <div className="margin-bottom-20px">
                <a href="#" className={"tab-picker " + (this.state.showTab=="users" && "tab-picker-active")} onClick={this.showTab.bind(this, "users")}>Most Coins Won</a>
                <a href="#" className={"tab-picker " + (this.state.showTab == "wagers" && "tab-picker-active")} onClick={this.showTab.bind(this, "wagers")}>Hottest Wagers</a>
                </div>

                <div className="row">
                    <div className={"col-sm-8 " + (this.state.showTab=="users" || "hidden")}>
                      {users}
                    </div>
                    <div className={"col-sm-8 " + (this.state.showTab=="wagers" || "hidden")}>
                      <TopWagers/>
                    </div>
                </div>
            </section>
        );

    }
}


module.exports = Leaderboard;
