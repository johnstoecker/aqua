'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Comment = require('./comment')

// Statuses: pending,rejected,standing,true,false

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

    static deleteCommentFromPrediction(predictionId, commentId, userId, callback) {
        const updateParams = { '$pull':
            {
                "comments": {
                    "_id": this.ObjectId(commentId),
                    "user_id": userId
                }
            }
        };
        this.findByIdAndUpdate(this.ObjectId(predictionId), updateParams, callback)
    }
}

Prediction.collection = 'predictions';

Prediction.schema = Joi.object().keys({
    _id: Joi.object(),
    user_id: Joi.string().required(),
    author: Joi.string(),
    authorHouse: Joi.string(),
    text: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    time: Joi.date().required(),
    awards: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Comment.schema),
    status: Joi.string().default("pending").valid('pending', 'standing', 'true', 'false')
});

// TODO: add more indices for text
Prediction.indexes = [
  { key: { user_id: 1 } },
  { author: 1},
  { tags: "text", text: "text" }
];

module.exports = Prediction;
