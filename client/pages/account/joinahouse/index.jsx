'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const Houses = require('../../../../data/houses.json');

// const PropTypes = require('prop-types');

class JoinHousePage extends React.Component {
    constructor(props) {

        super(props);

        // Actions.getPredictions();

        // this.state = Store.getState();
    }

    joinHouse(house) {

    }

    render() {
        // <div href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[0])}>

        return (
            <section className="container">
                <h1 className="page-header">Join a House - Enter the Team Game</h1>
                <div className="col-sm-9">
                    <p>Winter is here and you must join a house to survive. Other house members are your teammates. Together you must win the most wagers and take the Iron Wagers Throne! Each house has a few quirky rules to pad your iron bank account.</p>
                    <p className="font-bold">Choose wisely -- you cannot switch</p>
                </div>
                <div className="col-sm-3">
                    <img src="/public/media/iron-throne-question.png"/>
                    <div className="font-bold">Who will sit upon the Iron Wagers Throne for Season 7?</div>
                </div>
                <div className="col-sm-12 house-picker-container">
                    <div className="house-picker-wrapper greyjoy">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div>{Houses[0].name}</div>
                        </div>
                        <div className="house-attribute-title">⚓ We Do Not Sow ⚓</div>
                        <div className="house-attribute-detail">+12 for each naval battle (2+ ships)</div>
                        <div className="house-attribute-title">🐙 What is dead, could die 🐙</div>
                        <div className="house-attribute-detail">-2 For each week no Greyjoy is seen on a ship</div>
                    </div>
                    <div className="house-picker-wrapper lannister">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[1].image} />
                            <div className="house-banner-name">{Houses[1].name}</div>
                        </div>
                        <div className="house-attribute-title">👑 Golden Crown 👑</div>
                        <div className="house-attribute-detail">+5 for each week Cersei is Queen</div>
                        <div className="house-attribute-title">👫 Twincest 👫</div>
                        <div className="house-attribute-detail">-2 for each week Cersei and Jaime don't meet</div>
                    </div>
                    <div className="house-picker-wrapper white-walkers">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[2].image} />
                            <div className="house-banner-name">{Houses[2].name}</div>
                        </div>
                        <div className="house-attribute-title">❄ Ice Nine ❄</div>
                        <div className="house-attribute-detail">+9 for each week the Night King is South of the Wall</div>
                        <div className="house-attribute-title">🔵 Seeing Blue 🔵</div>
                        <div className="house-attribute-detail">-1 for each week walker burnt to death, cooldown: 5 mins</div>
                    </div>
                    <div className="house-picker-wrapper stark">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[3].image} />
                            <div className="house-banner-name">{Houses[3].name}</div>
                        </div>
                        <div className="house-attribute-title">🗡 Needlework 🗡</div>
                        <div className="house-attribute-detail">+4 for each Arya kill, cooldown: 5 minutes</div>
                        <div className="house-attribute-title">🤔 Knows Nothing 🤔</div>
                        <div className="house-attribute-detail">-2 for each week Jon Snow makes a big mistake</div>
                    </div>
                    <div className="house-picker-wrapper targaryen">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[4].image} />
                            <div className="house-banner-name">{Houses[4].name}</div>
                        </div>
                        <div className="house-attribute-title">✨ Overpowered ✨</div>
                        <div className="house-attribute-detail">+20 for each new magical power Daenerys gets</div>
                        <div className="house-attribute-title">🐲 Dragon Along 🐲</div>
                        <div className="house-attribute-detail">-2 for each week a dragon disobeys</div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = JoinHousePage;
