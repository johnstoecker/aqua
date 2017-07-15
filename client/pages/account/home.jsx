'use strict';
const React = require('react');
const Actions = require('./settings/actions');
const Store = require('./settings/store');
const Houses = require('../../../data/houses.json');

class HomePage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getUser();

        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    toggleShowHouses() {
        this.setState({showHouses: !this.state.showHouses})
    }

    goToJoinHouse() {
        window.location.href = "/account/joinahouse"
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    readRavens() {
        Actions.dismissMessages();
    }

    goToPredictions() {
        window.location.href = "/account/predictions"
    }

    goToUserPredictions() {
        window.location.href = "/account/predictions/user/"+ this.state.user.username
    }

    goToHouses() {
        window.location.href = "/account/houses"
    }

    seeOldRavens() {
        this.setState({showAllMessages: true})
    }

    hideOldRavens() {
        this.setState({showAllMessages: false})
    }

    render() {
        console.log(this.state)
        if (this.props.location.search == "?onboard=true") {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 onboarding-splash">
                            <img src="/public/media/bran.png"/>
                            <h1 className="page-header">A Song of Predictions and Wagers</h1>
                            <p>
                                Welcome to Iron Wagers, a game where your predictions for GoT are your strongest weapons
                            </p>
                            <form action="/account/intro">
                                <input className="thronesy-button onboarding-button" type="submit" value="Learn How to Play" />
                            </form>
                            <form action="/account">
                                <input className="thronesy-white-button onboarding-button" type="submit" value="Skip" />
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        let accountDetails
        // show intro for new user
        if(this.state.user.availableCoins == 100 && this.state.user.coins == 0 && this.state.user.lostCoins == 0) {
            accountDetails = (
                <div className="prediction-container">
                    <div className= "prediction-box">
                        <div className="wager-stat-box background-white">
                            Welcome to Iron Wagers, the game of thronesy predictions! You have no stats -- yet!
                        </div>
                    </div>
                </div>
            )
        } else {
            let houseName
            if(this.state.user.house){
                if(this.state.user.house.name == "White Walkers") {
                    houseName="the White Walkers"
                }else {
                    houseName="House "+ this.state.user.house.name
                }
            }
            accountDetails = (
                <div>
                    <div href="#" onClick={this.goToUserPredictions.bind(this)} className="prediction-container hover-zoom">
                        <div className={"prediction-box " + (this.state.user.house && this.state.user.house.name || "").toLowerCase().replace(/\s/, "-")}>
                            <div className="prediction-box-footer">
                                <div className={"iron-coin " + (this.state.user.house && this.state.user.house.name || "").toLowerCase().replace(/\s/, "-")}/>
                                <div className="wager-points">
                                    <div>{this.state.user.coins}</div>
                                    <div>coins</div>
                                </div>
                                <div className="prediction-status-info">Won</div>
                                <div className="wager-stat-detail">{this.state.user.house && ("Won for "+houseName)}{!this.state.user.house && ""}</div>
                            </div>
                        </div>
                    </div>
                    <div href="#" onClick={this.goToUserPredictions.bind(this)} className="prediction-container hover-zoom">
                        <div className="prediction-box">
                            <div className="wager-stat-box background-white">
                                <div className={"iron-coin " + (this.state.user.house && this.state.user.house.name || "").toLowerCase().replace(/\s/, "-")}/>
                                <div className="wager-points">
                                    <div>{this.state.user.reservedCoins}</div>
                                    <div>coins</div>
                                </div>
                                <div className="prediction-status-info">TBD</div>
                                <div className="wager-stat-detail">These are in play -- wait and watch (standing or pending wagers)</div>
                            </div>
                        </div>
                    </div>
                    <div href="#" onClick={this.goToUserPredictions.bind(this)} className="prediction-container hover-zoom">
                        <div className="prediction-box">
                            <div className="wager-stat-box prediction-box-details-rejected">
                                <div className="iron-coin iron-coin-lost"/>
                                <div className="wager-points">
                                    <div>{this.state.user.lostCoins}</div>
                                    <div>coins</div>
                                </div>
                                <div className="prediction-status-info">Lost</div>
                                <div className="wager-stat-detail">Were lost (incorrect wagers)</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        let house
        if(!this.state.user.house) {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Join a House</h1>
                    <p>This gets you into the team game</p>
                <button className="btn btn-primary" onClick={this.goToJoinHouse.bind(this)} type="submit">Select a House</button>
                </div>
            )
        } else if(this.state.user.house.name == "Greyjoy") {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Playing for:</h1>

                    <div className="house-player-wrapper greyjoy">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div className="house-banner-name">House Greyjoy</div>
                        </div>
                        <div className="house-attribute-title">⚓ We Do Not Sow ⚓</div>
                        <div className="house-attribute-detail">+10 for each naval battle (2+ ships)</div>
                        <div className="house-attribute-title">🐙 What is dead, could die 🐙</div>
                        <div className="house-attribute-detail">-2 For each week no Greyjoy is seen on a ship</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.goToHouses.bind(this)}>Stats</button>
                        </div>
                    </div>
                </div>)
        } else if(this.state.user.house.name == "Lannister") {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Playing for:</h1>

                    <div className="house-player-wrapper lannister">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[1].image} />
                            <div className="house-banner-name">House Lannister</div>
                        </div>
                        <div className="house-attribute-title">👑 Golden Crown 👑</div>
                        <div className="house-attribute-detail">+6 for each week Cersei is Queen</div>
                        <div className="house-attribute-title">👫 Twincest 👫</div>
                        <div className="house-attribute-detail">-2 for each week Cersei and Jaime don't meet</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.goToHouses.bind(this)}>Stats</button>
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.user.house.name == "White Walkers") {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Playing for:</h1>
                    <div className="house-player-wrapper white-walkers">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[2].image} />
                            <div className="house-banner-name">White Walkers</div>
                        </div>
                        <div className="house-attribute-title">❄ Ice Nine ❄</div>
                        <div className="house-attribute-detail">+9 for each week the Night King is South of the Wall</div>
                        <div className="house-attribute-title">🔵 Seeing Blue 🔵</div>
                        <div className="house-attribute-detail">-2 for each walker burnt to death, cooldown: 3 minutes</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.goToHouses.bind(this)}>Stats</button>
                        </div>

                    </div>
                </div>
            )
        } else if(this.state.user.house.name == "Stark") {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Playing for:</h1>
                    <div className="house-player-wrapper stark">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[3].image} />
                            <div className="house-banner-name">House Stark</div>
                        </div>
                        <div className="house-attribute-title">🗡 Needlework 🗡</div>
                        <div className="house-attribute-detail">+5 for each Arya kill</div>
                        <div className="house-attribute-title">🍽 Power Hungry 🍽</div>
                        <div className="house-attribute-detail">-3 for each week Sansa talks to Littlefinger</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.goToHouses.bind(this)}>Stats</button>
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.user.house.name == "Targaryen") {
            house = (
                <div className="col-sm-3 playingfor-container">
                    <h1 className="page-section-header">Playing for:</h1>
                    <div className="house-player-wrapper targaryen">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[4].image} />
                            <div className="house-banner-name">House Targaryen</div>
                        </div>
                        <div className="house-attribute-title">🐲 Wild Fire 🐲</div>
                        <div className="house-attribute-detail">+5 for each dragon flame, cooldown: 1 minute</div>
                        <div className="house-attribute-title">🍷 Drunken Hand 🍷</div>
                        <div className="house-attribute-detail">-1 for each wine cup Tyrion drinks</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.goToHouses.bind(this)}>Stats</button>
                        </div>
                    </div>
                </div>
            )
        }
        let messages;
        var allMessages = this.state.user.messages || []
        if(allMessages.length == 0) {
            messages = (

                <div>
                    <p> First step, <a href="/account/joinahouse">join a house</a></p>
                    <p> Second step, <a href="/account/predictions">see what wagers</a> folks have made </p>
                    <p> Third step, <a href="/account/predictions/new">wager your coin!</a> </p>
                    <p> Miss the tour? <a href="/account/intro">Learn how it works</a> </p>
                </div>
            )
        } else if((allMessages.filter(function(x){ return x.dismissed == false}).length == 0 && !this.state.showAllMessages)) {
            messages = (<div>

                    <div className="margin-bottom-10px">
                    <a href="#" className="tab-picker" onClick={this.readRavens.bind(this)}>Mark Ravens as Read</a> &nbsp;| &nbsp;
                    <a href="#" className={"tab-picker " + (this.state.showAllMessages == true && "hidden")}  onClick={this.seeOldRavens.bind(this)}>View Old Ravens</a>
                    <a href="#" className={"tab-picker " + (!!!this.state.showAllMessages == true && "hidden")}  onClick={this.hideOldRavens.bind(this)}>Hide Old Ravens</a>
                    </div>

                [You have no new ravens]</div>)
        }
        else {
            let showMessages
            var userMessages = [...this.state.user.messages].reverse();
            showMessages = (userMessages.map((message) => {
                let userMessageEmoji, userMessageLink
                if(message.type == "approval") {
                    userMessageEmoji = "✅"
                } else if(message.type == "rejection") {
                    userMessageEmoji = "🚫"
                } else if(message.type == "true") {
                    userMessageEmoji = "💰"
                } else if(message.type == "false") {
                    userMessageEmoji = "⛔"
                } else if(message.type == "housejoin") {
                    userMessageEmoji = "⚔"
                } else if(message.type == "newcomment") {
                    userMessageEmoji = "💬"
                } else if(message.type == "doubledown") {
                    userMessageEmoji = "👍"
                } else if(message.type == "award") {
                    userMessageEmoji = "🏆"
                }
                // if(message.link == "/account/criteria") {
                //     userMesageLink = "criteria";
                // }
                // <div className="fa fa-external-link">
                if(message.dismissed && !this.state.showAllMessages) {
                    return (<div/>);
                }else {
                    return (
                        <div>
                            <div className="user-message-container" key={message._id}>
                                <div className="user-message-type">{userMessageEmoji}</div>
                                <div className="user-message">{message.message}</div>
                                <a className={"fa fa-external-link " + (message.link || "hidden")} href={message.link}/>
                                <div className="user-message-dismiss"></div>
                            </div>
                    </div>
                    )
                }
            }))
            messages = (
                <div>
                    <a href="#" className="read-ravens" onClick={this.readRavens.bind(this)}>Mark Ravens as Read </a> &nbsp;| &nbsp;
                        <a href="#" className={"view-ravens " + (this.state.showAllMessages == true && "hidden")}  onClick={this.seeOldRavens.bind(this)}>View Old Ravens</a>
                        <a href="#" className={"view-ravens " + (!!!this.state.showAllMessages == true && "hidden")}  onClick={this.hideOldRavens.bind(this)}>Hide Old Ravens</a>
                    {showMessages}
                </div>
            )
        }
        return (
            <section className="section-home container">
              <h1 className="page-header">Wager stats for {this.state.user.username}</h1>
                <div className="row">

                    <div className="col-sm-8">
                        {accountDetails}
                        <br/>
                        <p className="font-bold font-size-18">{this.state.user.availableCoins} coins are available to wager</p>
                        <p className="margin-bottom-20px">Wager on your own Season 7 predictions, or bet on someone else's</p>
                        <button className="btn btn-primary" onClick={this.goToPredictions.bind(this)} type="submit">See All Wagers</button>
                        <div className="the-rookery">
                        <h2 className="page-header">Ravens from the Iron Bank</h2>
                            <div className="raven desktop-only">
                                <img src="/public/media/raven-mail.png" />
                            </div>
                        {messages}
                    </div>
                    </div>
                    <div className="col-sm-1"></div>
                    {house}
                </div>



            </section>
        );
    }
}


module.exports = HomePage;
