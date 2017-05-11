'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class House extends MongoModels {}

House.schema = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required()
});

module.exports = House;
