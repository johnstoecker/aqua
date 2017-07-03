'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const User = require('./user');
const Prediction = require('./prediction');
// const Wager = require('./wager');

class House extends MongoModels {
    static updateAllHouses() {

        const document = {
            user_id: user_id,
            characters: characters
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }

            callback(null, docs[0]);
        });
    }
    static getHouseStats(name) {
    }
}

House.collection = 'houses';

House.schema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    userCount: Joi.number().integer(),
    numPredictions: Joi.number().integer(),
    coins: Joi.number().integer(),
    availableCoins: Joi.number().integer()
});

module.exports = House;
