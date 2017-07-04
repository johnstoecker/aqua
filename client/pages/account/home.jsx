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

    joinHouse(house) {
        this.toggleShowHouses();
        Actions.saveHouse(house);
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
        let accountDetails, ravenIntro
        // show intro for new user
        if(this.state.user.availableCoins == 100 && this.state.user.coins == 0 && this.state.user.lostCoins == 0) {
            accountDetails = (
                <div className= "prediction-box">
                    Welcome to Iron Wagers, the game of thronesy predictions! You have made 0 wagers...so far
                </div>
            )
            ravenIntro = (
                <div>
                    <p> First step, <a href="#" onClick={this.toggleShowHouses.bind(this)}>join a house</a></p>
                    <p> Second step, <a href="/account/predictions">see what wagers</a> folks have made </p>
                    <p> Third step, <a href="/account/predictions/new">wager your coin!</a> </p>
                    <p> Miss the tour? <a href="/account/intro">Learn how it works</a> </p>
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
                    <div className="prediction-container">
                        <div className={"prediction-box " + (this.state.user.house && this.state.user.house.name || "").toLowerCase().replace(/\s/, "-")}>
                            <div className="prediction-box-footer">
                                <div className={"iron-coin " + (this.state.user.house && this.state.user.house.name || "").toLowerCase().replace(/\s/, "-")}/>
                                <div className="wager-points">
                                    <div>{this.state.user.coins}</div>
                                    <div>coins</div>
                                </div>
                                <div className="prediction-status-info">Won</div>
                                <div className="wager-stat-detail">{this.state.user.house && ("Won for "+houseName)}{!this.state.user.house && "Won (join a House!)"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="prediction-container">
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
                    <div className="prediction-container">
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
        if(this.state.user.house){
            house = (
                <div className="col-sm-4">
                    <div className="well text-center">
                        <div className="stat-value">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+this.state.user.house.image} />
                        </div>
                        <div className="stat-label">House {this.state.user.house.name}</div>
                    </div>
                </div>
            )
        }
        else {
            house = (
                <a href="#" className="col-sm-4" onClick={this.toggleShowHouses.bind(this)}>
                    <div className="well text-center">
                        <div className="stat-value">
                            <div className="fa fa-plus"/>
                        </div>
                        <div className="stat-label">Join a House</div>
                    </div>
                </a>
            )
        }
        let messages;
        var allMessages = this.state.user.messages || []
        if(allMessages.length == 0) {
            messages = (<div>[You have no ravens]</div>)
        } else if((allMessages.filter(function(x){ return x.dismissed == false}).length == 0 && !this.state.showAllMessages)) {
            messages = (<div>[You have no new ravens]</div>)
        }
        else {
            var userMessages = [...this.state.user.messages].reverse();
            messages = (userMessages.map((message) => {
                let userMessageEmoji, userMessageLink
                if(message.type == "approval") {
                    userMessageEmoji = "✅"
                } else if(message.type == "rejection") {
                    userMessageEmoji = "🚫"
                } else if(message.type == "true") {
                    userMessageEmoji = "💰"
                } else if(message.type == "false") {
                    userMessageEmoji = "⛔"
                }
                // if(message.link == "/account/criteria") {
                //     userMesageLink = "criteria";
                // }
                // <div className="fa fa-external-link">
                if(message.dismissed && !this.state.showAllMessages) {
                    return (<div/>);
                }else {
                    return (
                        <div className="user-message-container" key={message._id}>
                            <div className="user-message-type">{userMessageEmoji}</div>
                            <div className="user-message">{message.message}</div>
                            <div className="user-message-dismiss"></div>
                        </div>
                    )
                }
            }))
        }
        return (
            <section className="section-home container">
                <div className="row">
                    <div className="col-sm-9">
                        <h1 className="page-header">Wager stats for {this.state.user.username}</h1>
                        {accountDetails}
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
                <br/>
                <p className="font-bold font-size-16">{this.state.user.availableCoins} coins are available to wager</p>
                <p>Wager on your own predictions or bet on someone else's!</p>
                <button className="btn btn-primary" onClick={this.goToPredictions.bind(this)} type="submit">See All Wagers</button>
                <div className="row">
                    <div className="col-sm-9 the-rookery">
                        <h2 className="page-header">Ravens from the Iron Bank</h2>
                        <a href="#" className="read-ravens" onClick={this.readRavens.bind(this)}>Mark Ravens as Read</a>|
                            <a href="#" className={"view-ravens " + (this.state.showAllMessages == true && "hidden")}  onClick={this.seeOldRavens.bind(this)}>View Old Ravens</a>
                            <a href="#" className={"view-ravens " + (!!!this.state.showAllMessages == true && "hidden")}  onClick={this.hideOldRavens.bind(this)}>Hide Old Ravens</a>
                        {messages}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
