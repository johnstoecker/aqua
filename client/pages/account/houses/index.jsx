'use strict';
const React = require('react');
const Store = require('../predictions/store');
const Actions = require('../predictions/actions')
const Houses = require('../../../../data/houses.json');

// const PropTypes = require('prop-types');

class HouseStatsPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getHouseStats();
        this.state = Store.getState();
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params != nextProps.match.params) {
            this.loadPredictions(nextProps);
        }
    }

    componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    render() {
        // <div href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[3])}>
        console.log(this.state)
        console.log(this.props)
        return (
            <section className="container">
                <div className="col-sm-8">
                    <h1 className="page-header">Great Houses of Westeros</h1>
                    <p>Join a house to enter the team competition. All of your house's correct wagers will be banked together for the iron wagers team competition.  Each house has a few special perks and quirks that affect scores.  The team scores are averaged at the end (so the team with the most players isn't necessarily the winner). </p>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                    <div className="iron-wagers-throne-container">
                        <img className="iron-wagers-throne" src="/public/media/ironwagersthrone.png"/>
                        <div className="font-center">Who will sit upon the Iron Wagers Throne for Season 8?</div>
                    </div>
                </div>
                <div className="col-sm-12 house-picker-container">
                    <div className="house-picker-wrapper house-stats-wrapper lannister">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div className="house-banner-name">House Lannister</div>
                        </div>
                        <div className="house-attribute-title">🌞 Endless Summer 🌞</div>
                        <div className="house-attribute-detail">+6 for each week the walkers stay out of Kings Landing</div>
                        <div className="house-attribute-title">🍷 Drowned Sorrows 🍷</div>
                        <div className="house-attribute-detail">-2 for each week Cersei drinks wine alone</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[0] && this.state.houseStats.data[0].plusCoins}/-{this.state.houseStats.data[0] && this.state.houseStats.data[0].minusCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].userCount}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].coins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].availableCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].steelWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].ironWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[0] && this.state.houseStats.data[0].saltWagers}</div>
                                </div>
                                <div className="house-attribute-stat-labels">
                                    <div className="house-attribute-stat-label">current bonus</div>
                                    <div className="house-attribute-stat-label">house members</div>
                                    <div className="house-attribute-stat-label">coins banked</div>
                                    <div className="house-attribute-stat-label">available coins</div>
                                    <div className="prediction-status-info house-attribute-stat-label">Valyrian Steel Wagers
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 gain the predictor +25 coins</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Iron Wagers
                                        <div className="prediction-status-box">💰Iron Wagers💰 have come true</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Salt Wagers
                                        <div className="prediction-status-box">Salt Wagers have been rejected, or lost. 🔔Shame!🔔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="house-picker-wrapper house-stats-wrapper greyjoy">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[1].image} />
                            <div className="house-banner-name">House Greyjoy</div>
                        </div>
                        <div className="house-attribute-title">🐙 Sea Legs 🐙</div>
                        <div className="house-attribute-detail">+5 for each land battle fought by Euron, +10 for any sea battle</div>
                        <div className="house-attribute-title">🎣 The Salty Queen 🎣</div>
                        <div className="house-attribute-detail">-2 For each episode Yara remains a prisoner</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[1] && this.state.houseStats.data[1].plusCoins}/-{this.state.houseStats.data[1] && this.state.houseStats.data[1].minusCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].userCount}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].coins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].availableCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].steelWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].ironWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[1] && this.state.houseStats.data[1].saltWagers}</div>
                                </div>
                                <div className="house-attribute-stat-labels">
                                    <div className="house-attribute-stat-label">current bonus</div>
                                    <div className="house-attribute-stat-label">house members</div>
                                    <div className="house-attribute-stat-label">coins banked</div>
                                    <div className="house-attribute-stat-label">available coins</div>
                                    <div className="prediction-status-info house-attribute-stat-label">Valyrian Steel Wagers
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 gain the predictor +25 coins</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Iron Wagers
                                        <div className="prediction-status-box">💰Iron Wagers💰 have come true</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Salt Wagers
                                        <div className="prediction-status-box">Salt Wagers have been rejected, or lost. 🔔Shame!🔔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="house-picker-wrapper house-stats-wrapper white-walkers">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[2].image} />
                            <div className="house-banner-name">White Walkers</div>
                        </div>
                        <div className="house-attribute-title">❄ Icy Tingle ❄</div>
                        <div className="house-attribute-detail">+8 for every named character turned into a wight</div>
                        <div className="house-attribute-title">🔥 Winter BBQ 🔥</div>
                        <div className="house-attribute-detail">-2 for each walker burnt to death, cooldown: 3 minutes</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[2] && this.state.houseStats.data[2].plusCoins}/-{this.state.houseStats.data[2] && this.state.houseStats.data[2].minusCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].userCount}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].coins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].availableCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].steelWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].ironWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[2] && this.state.houseStats.data[2].saltWagers}</div>
                                </div>
                                <div className="house-attribute-stat-labels">
                                    <div className="house-attribute-stat-label">current bonus</div>
                                    <div className="house-attribute-stat-label">house members</div>
                                    <div className="house-attribute-stat-label">coins banked</div>
                                    <div className="house-attribute-stat-label">available coins</div>
                                    <div className="prediction-status-info house-attribute-stat-label">Valyrian Steel Wagers
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 gain the predictor +25 coins</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Iron Wagers
                                        <div className="prediction-status-box">💰Iron Wagers💰 have come true</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Salt Wagers
                                        <div className="prediction-status-box">Salt Wagers have been rejected, or lost. 🔔Shame!🔔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="house-picker-wrapper house-stats-wrapper targaryen">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[3].image} />
                            <div className="house-banner-name">House Targaryen</div>
                        </div>
                        <div className="house-attribute-title">🐲 Wild Fire 🐲</div>
                        <div className="house-attribute-detail">+5 for each dragonfire flame, cooldown: 1 minute</div>
                        <div className="house-attribute-title">🍗 Knock Kneed 🍗</div>
                        <div className="house-attribute-detail">-2 for each noble person that refuses to bend the knee to Dany (not during active battle), cooldown: 2 minutes</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[3] && this.state.houseStats.data[3].plusCoins}/-{this.state.houseStats.data[3] && this.state.houseStats.data[3].minusCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].userCount}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].coins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].availableCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].steelWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].ironWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[3] && this.state.houseStats.data[3].saltWagers}</div>
                                </div>
                                <div className="house-attribute-stat-labels">
                                    <div className="house-attribute-stat-label">current bonus</div>
                                    <div className="house-attribute-stat-label">house members</div>
                                    <div className="house-attribute-stat-label">coins banked</div>
                                    <div className="house-attribute-stat-label">available coins</div>
                                    <div className="prediction-status-info house-attribute-stat-label">Valyrian Steel Wagers
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 gain the predictor +25 coins</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Iron Wagers
                                        <div className="prediction-status-box">💰Iron Wagers💰 have come true</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Salt Wagers
                                        <div className="prediction-status-box">Salt Wagers have been rejected, or lost. 🔔Shame!🔔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="house-picker-wrapper house-stats-wrapper stark">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[4].image} />
                            <div className="house-banner-name">House Stark</div>
                        </div>
                        <div className="house-attribute-title">🎭 Face/Off 🎭</div>
                        <div className="house-attribute-detail">+10 for every new face Arya wears</div>
                        <div className="house-attribute-title">👑 Bran=Night King? 👑</div>
                        <div className="house-attribute-detail">- 2 for every time Bran wargs cooldown: 1 minute</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[4] && this.state.houseStats.data[4].plusCoins}/-{this.state.houseStats.data[4] && this.state.houseStats.data[4].minusCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].userCount}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].coins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].availableCoins}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].steelWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].ironWagers}</div>
                                    <div className="house-attribute-stat">{this.state.houseStats.data[4] && this.state.houseStats.data[4].saltWagers}</div>
                                </div>
                                <div className="house-attribute-stat-labels">
                                    <div className="house-attribute-stat-label">current bonus</div>
                                    <div className="house-attribute-stat-label">house members</div>
                                    <div className="house-attribute-stat-label">coins banked</div>
                                    <div className="house-attribute-stat-label">available coins</div>
                                    <div className="prediction-status-info house-attribute-stat-label">Valyrian Steel Wagers
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 gain the predictor +25 coins</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Iron Wagers
                                        <div className="prediction-status-box">💰Iron Wagers💰 have come true</div>
                                    </div>
                                    <div className="prediction-status-info house-attribute-stat-label">Salt Wagers
                                        <div className="prediction-status-box">Salt Wagers have been rejected, or lost. 🔔Shame!🔔</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HouseStatsPage;
