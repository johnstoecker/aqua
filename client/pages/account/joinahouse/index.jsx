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
        Actions.saveHouse(house);
    }

    render() {
        // <div href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[0])}>

        return (
            <section className="container">
                <div className="col-sm-8">
                    <h1 className="page-header">Join a House - Enter the Team Game</h1>
                    <p>Winter is here and you must join a house to survive. Other house members are your teammates. Together you must win the most wagers and take the Iron Wagers Throne! Each house has a few quirky rules to pad your iron bank account.</p>
                    <p className="font-bold">Choose wisely -- you cannot switch</p>
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                    <div className="iron-wagers-throne-container">
                        <img className="iron-wagers-throne" src="/public/media/ironwagersthrone.png"/>
                        <div className="font-center">Who will sit upon the Iron Wagers Throne for Season 7?</div>
                    </div>
                </div>
                <div className="col-sm-12 house-picker-container">
                    <div className="house-picker-wrapper greyjoy">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[0].image} />
                            <div className="house-banner-name">House Greyjoy</div>
                        </div>
                        <div className="house-attribute-title">⚓ We Do Not Sow ⚓</div>
                        <div className="house-attribute-detail">+10 for each naval battle (2+ ships)</div>
                        <div className="house-attribute-title">🐙 What is dead, could die 🐙</div>
                        <div className="house-attribute-detail">-2 For each week no Greyjoy is seen on a ship</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.joinHouse.bind(this, Houses[0])}>Join</button>
                        </div>
                    </div>
                    <div className="house-picker-wrapper lannister">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[1].image} />
                            <div className="house-banner-name">House Lannister</div>
                        </div>
                        <div className="house-attribute-title">👑 Golden Crown 👑</div>
                        <div className="house-attribute-detail">+6 for each week Cersei is Queen</div>
                        <div className="house-attribute-title">👫 Twincest 👫</div>
                        <div className="house-attribute-detail">-2 for each week Cersei and Jaime don't meet</div>
                        <div className="justify-button">
                        <button className="thronesy-white-button house-join-button" onClick={this.joinHouse.bind(this, Houses[1])}>Join</button>
                        </div>
                    </div>
                    <div className="house-picker-wrapper white-walkers">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[2].image} />
                            <div className="house-banner-name">{Houses[2].name}</div>
                        </div>
                        <div className="house-attribute-title">❄ Ice Nine ❄</div>
                        <div className="house-attribute-detail">+9 for each week the Night King is South of the Wall</div>
                        <div className="house-attribute-title">🔵 Seeing Blue 🔵</div>
                        <div className="house-attribute-detail">-2 for each walker burnt to death, cooldown: 3 minutes</div>
                        <div className="justify-button">
                        <button className="thronesy-white-button house-join-button" onClick={this.joinHouse.bind(this, Houses[2])}>Join</button>
                        </div>
                    </div>
                    <div className="house-picker-wrapper stark">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[3].image} />
                            <div className="house-banner-name">House Stark</div>
                        </div>
                        <div className="house-attribute-title">🗡 Needlework 🗡</div>
                        <div className="house-attribute-detail">+5 for each Arya kill</div>
                        <div className="house-attribute-title">🍽 Power Hungry 🍽</div>
                        <div className="house-attribute-detail">-3 for each week Sansa talks to Littlefinger</div>
                        <div className="justify-button">
                            <button className="thronesy-white-button house-join-button" onClick={this.joinHouse.bind(this, Houses[3])}>Join</button>
                        </div>
                    </div>
                    <div className="house-picker-wrapper targaryen">
                        <div className="house-banner">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+Houses[4].image} />
                            <div className="house-banner-name">House Targaryen</div>
                        </div>
                        <div className="house-attribute-title">🐲 Wild Fire 🐲</div>
                        <div className="house-attribute-detail">+5 for each dragon flame, cooldown: 1 minute</div>
                        <div className="house-attribute-title">🍷 Drunken Hand 🍷</div>
                        <div className="house-attribute-detail">-1 for each wine cup Tyrion drinks</div>
                        <div className="justify-button">
                        <button className="thronesy-white-button house-join-button" onClick={this.joinHouse.bind(this, Houses[4])}>Join</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = JoinHousePage;
