'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const User = require('./user');

class Wager extends MongoModels {

}

Wager.collection = 'wagers';

Wager.schema = Joi.object().keys({
    _id: Joi.object(),
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
