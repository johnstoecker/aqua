'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Comment = require('./comment')
const Boom = require("boom")
const Mongodb = require('mongodb');
const Wager = require('./wager');
const User = require('./user');
const Async = require('async');
// Statuses: pending,rejected,standing,won,lost
//
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

    // send message to user
    // decrement availableCoins, increase reservedCoins
    static updateStandingPredictionUser(userId, pred, wager, callback) {
        const userUpdate = {
            $push: {
                messages: {
                    message: "The wager " + pred.text +" has been approved by the Iron Bank.",
                    dismissed: false,
                    seen: false,
                    type: "approval",
                    _id: Mongodb.ObjectId()
                }
            }
        }
        const userFindParam = {
            _id: Mongodb.ObjectId(userId)
        }

        // WTF
        MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            callback(pred);
        });
        console.log('x')
    }

    // send message to user
    // increment availableCoins
    static updateRejectedPredictionUser(userId, pred, wager, callback) {
        const userUpdate = {
            $inc: {
                availableCoins: wager.coins,
                reservedCoins: -wager.coins
            },
            $push: {
                messages: {
                    message: "The salt wager " + pred.text +" has been rejected by the Iron Bank. " + wager.coins + " added back to your available coins.",
                    dismissed: false,
                    seen: false,
                    link: "/account/criteria",
                    type: "rejection",
                    _id: Mongodb.ObjectId()
                }
            }
        }
        const userFindParam = {
            _id: Mongodb.ObjectId(userId)
        }
        MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            callback(pred)
        });
    }

    // send message to user
    // decrement availableCoins, decrese reserved
    // TODO:
    // do this for all wagers on this pred!
    static updateTruePredictionUser(userId, pred, wager, callback) {
        const userUpdate = {
            $inc: {
                coins: wager.coins,
                reservedCoins: -wager.coins
            },
            $push: {
                messages: {
                    message: "The wager " + pred.text +" has come true! Coins banked: +" + wager.coins,
                    dismissed: false,
                    seen: false,
                    type: "true",
                    _id: Mongodb.ObjectId()
                }
            }
        }
        const userFindParam = {
            _id: Mongodb.ObjectId(userId)
        }
        MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            callback(pred)
        });

    }

    // send message to user
    // decrement reservedCoins
    static updateFalsePredictionUser(userId, pred, wager, callback) {

        const userUpdate = {
            $inc: {
                reservedCoins: -wager.coins,
                lostCoins: wager.coins
            },
            $push: {
                messages: {
                    message: "Your wager " + pred.text +" has not come true.",
                    dismissed: false,
                    seen: false,
                    type: "false",
                    _id: Mongodb.ObjectId()
                }
            }
        }
        const userFindParam = {
            _id: Mongodb.ObjectId(userId)
        }
        MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            callback(pred)
        });

    }

    static doTheNeedful(request, wager, pred, callback) {
        if (request.payload.status =='rejected') {
            this.updateRejectedPredictionUser(wager.userId, pred, wager, callback)
        } else if (request.payload.status == 'standing') {
            this.updateStandingPredictionUser(wager.userId, pred, wager, callback)
        } else if (request.payload.status == 'won') {
            this.updateTruePredictionUser(wager.userId, pred, wager, callback)
        } else if (request.payload.status == 'lost') {
            this.updateFalsePredictionUser(wager.userId, pred, wager, callback)
        }
    }

    static updatePredictionStatus(request, callback) {
        const update = {
            $set: {
                status: request.payload.status
            }
        }

        const findParam = {
            _id: Mongodb.ObjectId(request.params.id),
        }

        Prediction.findOneAndUpdate(findParam, update, (err, pred) => {
            if (err) {
                return callback(err);
            }

            console.log(pred)


            // 1. Update prediction status
            // 2. Find all wagers inside prediction
            // 3. For each wager user, update accordingly

            console.log
            Wager.find({predictionId: Mongodb.ObjectId(request.params.id)}, (err, wagers) => {
                if (err) {
                    return callback(err);
                }

                console.log(wagers)

                if (wagers.length < 1) {
                    return callback(Boom.badRequest("Wagers aren't linked correctly"))
                }


                const tasks = {}
                // GROSS, that scope
                let x, that;
                x = 0;
                that = this;
                wagers.forEach((wager) => {
                    tasks[x] = function (done) {
                        that.doTheNeedful(request, wager, pred, callback);
                    };
                });
                Async.auto(tasks, (err, results) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(results);
                });
                // Object.keys(this.groups).forEach((group) => {
                //
                //     tasks[group] = function (done) {
                //
                //         AdminGroup.findById(group, done);
                //     };
                // });
                //
                // Async.auto(tasks, (err, results) => {
                //
                //     if (err) {
                //         return callback(err);
                //     }
                //
                //     this._groups = results;
                //
                //     callback(null, this._groups);
                // });


            })


        })
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
    status: Joi.string().default("pending").valid('pending', 'standing', 'won', 'lost')
});

// TODO: add more indices for text
Prediction.indexes = [
  { key: { user_id: 1 } },
  { key: { author: 1} },
  { key: { tags: "text", text: "text"} }
];

module.exports = Prediction;
