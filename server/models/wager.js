'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const User = require('./user')
const Prediction = require('./prediction')

class Wager extends MongoModels {

    static create(user_id, predictionId, coins, callback) {
        const userUpdate = {
            $inc: {
                coins: -coins
            },
            $inc: {
                reservedCoins: coins
            }
        }
        User.findByIdAndUpdate(user_id, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            // TODO: figure out how to add time automatically here
            const wagerParams = {
                userId: user_id,
                user: user,
                coins: coins,
                predictionId: predictionId,
                status: 'pending'
            }
            this.insertOne(wagerParams, (err, docs) => {
                if (err) {
                    return callback(err);
                }
                const predParams = {
                    $inc: {
                        coins: coins
                    }
                }
                Prediction.findByIdAndUpdate(predictionId.toString(), predParams, callback)
            })
        })
    }
}

Wager.collection = 'wagers';

Wager.schema = Joi.object().keys({
    _id: Joi.object(),
    user: User.schema,
    coin: Joi.number().integer(),
    userId: Joi.string().required(),
    predictionId: Joi.string().required(),
    time: Joi.date().required(),
    status: Joi.string().default("pending").valid('pending', 'standing', 'true', 'false')
});

Wager.indexes = [
  { key: { userId: 1 } },
  { key: { predictionId: 1} }
];

module.exports = Wager;
