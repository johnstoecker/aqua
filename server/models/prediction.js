'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Comment = require('./comment')

// Statuses: pending,standing,true,false

class Prediction extends MongoModels {

    static addComment(id, params, callback) {
        params["_id"] = this.ObjectId();
        const updateParams = { '$push':
            {
                "comments": params
            }
        };
        this.findByIdAndUpdate(id, updateParams, callback)
    }
}

Prediction.collection = 'predictions';

Prediction.schema = Joi.object().keys({
    _id: Joi.object(),
    userId: Joi.string().required(),
    author: Joi.string(),
    text: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    time: Joi.date().required(),
    awards: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Comment.schema),
    status: Joi.string().default("pending").valid('pending', 'standing', 'true', 'false')
});

// TODO: add more indices for text
Prediction.indexes = [
  { key: { userId: 1 } }
];

module.exports = Prediction;
