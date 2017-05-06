'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');

class Comment extends MongoModels {}

Comment.collection = 'comments';

Comment.schema = Joi.object().keys({
    author: Joi.string().required(),
    authorHouse: Joi.string().required(),
    text: Joi.boolean().required(),
    predictionId: Joi.string().required()
});

module.exports = Comment;
