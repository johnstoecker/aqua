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
                        <h1 className="page-header">My account</h1>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.coins}
                                    </div>
                                    <div className="stat-label">Coins Won</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.reservedCoins}
                                    </div>
                                    <div className="stat-label">Reserved</div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.availableCoins}
                                    </div>
                                    <div className="stat-label">Available</div>
                                </div>
                            </div>
                            {house}
                        </div>
                    </div>
                </div>
                <div className={this.state.showHouses ? "col-sm-12 house-picker-container" : "hidden"}>
                    <div className="house-picker-wrapper">
                        <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[0])}>
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div>{Houses[0].name}</div>
                            <div className="house-attribute-title">⚓ We Do Not Sow ⚓</div>
                            <div className="house-attribute-detail">+12 for each naval battle (2+ ships)</div>
                            <div className="house-attribute-title">🐙 What is dead, could die 🐙</div>
                            <div className="house-attribute-detail">-2 For each week no Greyjoy is seen on a ship</div>
                        </a>
                    </div>
                    <div className="house-picker-wrapper">
                        <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[1])}>
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[1].image} />
                            <div>{Houses[1].name}</div>
                            <div className="house-attribute-title">👑 Golden Crown 👑</div>
                            <div className="house-attribute-detail">+5 for each week Cersei is Queen</div>
                            <div className="house-attribute-title">👫 Twincest 👫</div>
                            <div className="house-attribute-detail">-2 for each week Cersei and Jaime don't meet</div>
                        </a>
                    </div>
                    <div className="house-picker-wrapper">
                        <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[2])}>
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[2].image} />
                            <div>{Houses[2].name}</div>
                            <div className="house-attribute-title">❄ Ice Nine ❄</div>
                            <div className="house-attribute-detail">+9 for each week the Night King is South of the Wall</div>
                            <div className="house-attribute-title">🔵 Seeing Blue 🔵</div>
                            <div className="house-attribute-detail">-1 for each week walker burnt to death, cooldown: 5 mins</div>
                        </a>
                    </div>
                    <div className="house-picker-wrapper">
                        <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[3])}>
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[3].image} />
                            <div>{Houses[3].name}</div>
                            <div className="house-attribute-title">🗡 Needlework 🗡</div>
                            <div className="house-attribute-detail">+4 for each Arya kill, cooldown: 5 minutes</div>
                            <div className="house-attribute-title">🤔 Knows Nothing 🤔</div>
                            <div className="house-attribute-detail">-2 for each week Jon Snow makes a big mistake</div>
                        </a>
                    </div>
                    <div className="house-picker-wrapper">
                        <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[4])}>
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[4].image} />
                            <div>{Houses[4].name}</div>
                            <div className="house-attribute-title">✨ Overpowered ✨</div>
                            <div className="house-attribute-detail">+20 for each new magical power Daenerys gets</div>
                            <div className="house-attribute-title">🐲 Dragon Along 🐲</div>
                            <div className="house-attribute-detail">-2 for each week a dragon disobeys</div>
                        </a>
                    </div>
                </div>
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
