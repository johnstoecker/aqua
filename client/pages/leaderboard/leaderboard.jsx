'use strict';
const Actions = require('./actions');
const React = require('react');
const Store = require('./store');
const TopWagers = require('./topwagers')
const ThronesyWagers = require('./thronesywagers')


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
                    Season 7: Wagers of Salt, Wagers of Iron
                </h1>
                <div className="margin-bottom-20px">
                <a href="#" className={"tab-picker " + (this.state.showTab=="users" && "tab-picker-active")} onClick={this.showTab.bind(this, "users")}>Most Coins Won</a>
                <a href="#" className={"tab-picker " + (this.state.showTab == "wagers" && "tab-picker-active")} onClick={this.showTab.bind(this, "wagers")}>Hottest Wagers</a>
                <a href="#" className={"tab-picker " + (this.state.showTab == "thronesy" && "tab-picker-active")} onClick={this.showTab.bind(this, "thronesy")}>Thronesiest Wagers</a>
                </div>

                <div className="row">
                    <div className={"col-sm-8 " + (this.state.showTab=="users" || "hidden")}>
                        <div className="iron-wagers-throne-container">
                            <img className="iron-wagers-throne" src="/public/media/iron_throne_text.png"/>
                            <div className="font-center">Iron Heist Will Have His Due</div>
                        </div>


                        <div className="prediction-container" key="winner1">
                            <div className= "prediction-box stark">
                                <div className="prediction-box-footer">
                                    🏆
                                    <div className="iron-coin stark"></div>
                                    <div className="wager-points">
                                        <div>295</div>
                                        <div>coins</div>
                                    </div>
                                    <div>iron_heist</div>
                                    <div className="leaderboard-swing-right">
                                        <span>Stark</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="prediction-container" key="winner2">
                            <div className= "prediction-box targaryen">
                                <div className="prediction-box-footer">
                                    🏅
                                    <div className="iron-coin targaryen"></div>
                                    <div className="wager-points">
                                        <div>175</div>
                                        <div>coins</div>
                                    </div>
                                    <div>iainharlow</div>
                                    <div className="leaderboard-swing-right">
                                        <span>Targaryen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="prediction-container" key="winner3">
                            <div className= "prediction-box lannister">
                                <div className="prediction-box-footer">
                                    🏅
                                    <div className="iron-coin lannister"></div>
                                    <div className="wager-points">
                                        <div>128</div>
                                        <div>coins</div>
                                    </div>
                                    <div>lordcommandertarly</div>
                                    <div className="leaderboard-swing-right">
                                        <span>Lannister</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        Top Houses by average winnings:
                        <div className="prediction-container" key="house1">
                            <div className= "prediction-box stark">
                                <div className="prediction-box-footer">
                                    🏆
                                    <div className="iron-coin stark"></div>
                                    <div className="wager-points">
                                        <div>100</div>
                                        <div>coins</div>
                                    </div>
                                    <div>House Stark</div>
                                </div>
                            </div>
                        </div>
                        <div className="prediction-container" key="house2">
                            <div className= "prediction-box targaryen">
                                <div className="prediction-box-footer">
                                    🏅
                                    <div className="iron-coin targaryen"></div>
                                    <div className="wager-points">
                                        <div>79</div>
                                        <div>coins</div>
                                    </div>
                                    <div>House Targaryen</div>
                                </div>
                            </div>
                        </div>
                        <div className="prediction-container" key="house3">
                            <div className= "prediction-box lannister">
                                <div className="prediction-box-footer">
                                    🏅
                                    <div className="iron-coin lannister"></div>
                                    <div className="wager-points">
                                        <div>78</div>
                                        <div>coins</div>
                                    </div>
                                    <div>House Lannister</div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        Best username:
                        <div className="prediction-container" key="bestusername">
                            <div className= "prediction-box lannister">
                                <div className="prediction-box-footer">
                                    👌
                                    <div className="iron-coin lannister"></div>
                                    <div className="wager-points">
                                        <div>72</div>
                                        <div>coins</div>
                                    </div>
                                    <div>roosewitherspoon</div>
                                    <div className="leaderboard-swing-right">
                                        <span>Lannister</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        Best prediction:
                        <div className="prediction-container" key="bestprediction">
                            <div className= "prediction-box greyjoy">
                                <div className="prediction-box-footer">
                                    🐶
                                    <div className="iron-coin greyjoy"></div>
                                    <div className="wager-points">
                                        <div>10</div>
                                        <div>coins</div>
                                    </div>
                                    <div>Sandor Clegane is the Prince that was Promised</div>
                                    <div className="leaderboard-swing-right">
                                        <span>thronestradamus</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                      {users}
                    </div>
                    <div className={"col-sm-8 " + (this.state.showTab=="wagers" || "hidden")}>
                      <TopWagers/>
                    </div>
                    <div className={"col-sm-8 " + (this.state.showTab=="thronesy" || "hidden")}>
                      <ThronesyWagers/>
                    </div>
                </div>
            </section>
        );

    }
}


module.exports = Leaderboard;
