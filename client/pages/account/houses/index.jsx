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
        console.log("store change")
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
                    <p>A song of fire, ice, gold, salt, and snow.</p>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                    <div className="iron-wagers-throne-container">
                        <img className="iron-wagers-throne" src="/public/media/ironwagersthrone.png"/>
                        <div className="font-center">Who will sit upon the Iron Wagers Throne for Season 7?</div>
                    </div>
                </div>
                <div className="col-sm-12 house-picker-container">
                    <div className="house-picker-wrapper house-stats-wrapper lannister">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div className="house-banner-name">House Lannister</div>
                        </div>
                        <div className="house-attribute-title">👑 Golden Crown 👑</div>
                        <div className="house-attribute-detail">+6 for each week Cersei is Queen</div>
                        <div className="house-attribute-title">👫 Twincest 👫</div>
                        <div className="house-attribute-detail">-2 for each week Cersei and Jaime don't meet</div>
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
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 are coming soon!</div>
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
                        <div className="house-attribute-title">⚓ We Do Not Sow ⚓</div>
                        <div className="house-attribute-detail">+10 for each naval battle (2+ ships)</div>
                        <div className="house-attribute-title">🐙 What is dead, could die 🐙</div>
                        <div className="house-attribute-detail">-2 For each week no Greyjoy is seen on a ship</div>
                        <div className="house-attribute-stats-container">
                            <div className="house-attribute-title-center-underline">Stats</div>
                            <div className="house-attribute-stats-box">
                                <div className="house-attribute-stats">
                                    <div className="house-attribute-stat">+{this.state.houseStats.data[1] && this.state.houseStats.data[1].plusCoins}/-{this.state.houseStats.data[1] && this.state.houseStats.data[1]].minusCoins}</div>
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
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 are coming soon!</div>
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
                        <div className="house-attribute-title">❄ Ice Nine ❄</div>
                        <div className="house-attribute-detail">+9 for each week the Night King is South of the Wall</div>
                        <div className="house-attribute-title">🔵 Seeing Blue 🔵</div>
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
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 are coming soon!</div>
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
                        <div className="house-attribute-detail">+5 for each dragon flame, cooldown: 1 minute</div>
                        <div className="house-attribute-title">🍷 Drunken Hand 🍷</div>
                        <div className="house-attribute-detail">-1 for each wine cup Tyrion drinks</div>
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
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 are coming soon!</div>
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
                        <div className="house-attribute-title">🗡 Needlework 🗡</div>
                        <div className="house-attribute-detail">+5 for each Arya kill</div>
                        <div className="house-attribute-title">🍽 Power Hungry 🍽</div>
                        <div className="house-attribute-detail">-3 for each week Sansa talks to Littlefinger</div>
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
                                        <div className="prediction-status-box">🏆Valyrian Steel Wagers🏆 are coming soon!</div>
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
