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

    static addReaction(id, user_id, username, reaction, callback) {
        console.log(id)
        this.findById(Mongodb.ObjectId(id), (err, pred) => {
            let toggleOff=false
            if(err || !pred) {
                return callback(err)
            }
            reaction.usernames = [username]
            if(pred.reactions) {
                let found = false;
                for(let i=0; i<pred.reactions.length; i++) {
                    if(pred.reactions[i]["id"] == reaction.id) {
                        found = true;
                        let userIndex = pred.reactions[i]["usernames"].indexOf(username)
                        if(userIndex == -1) {
                            pred.reactions[i]["usernames"].push(username)
                        } else {
                            toggleOff=true
                            if(pred.reactions[i]["usernames"].length == 1) {
                                pred.reactions.splice(i,1)
                            } else {
                                pred.reactions[i]["usernames"].splice(userIndex,1)
                            }
                        }
                        break
                    }
                }
                if(!found) {
                    pred.reactions.push(reaction)
                }

            } else {
                pred.reactions = [reaction]
            }

            if(!toggleOff && pred.reactions.length>=10) {
                return callback(Boom.badRequest("too many reactions"))
            }

            const updateParams = {
                '$set': {
                    "reactions": pred.reactions
                }
            }
            this.findOneAndUpdate({_id: Mongodb.ObjectId(id)}, updateParams, callback)

        })
    }

    static addCommentReaction(id, commentId, user_id, username, reaction, callback) {
        this.findById(Mongodb.ObjectId(id), (err, pred) => {
            let toggleOff = false
            if(err || !pred) {
                return callback(err)
            }
            let comment;
            for(let ind=0; ind< pred.comments.length;ind++) {
                if(pred.comments[ind]._id == commentId) {
                    comment = pred.comments[ind]
                }
            }
            if(!comment) {
                return callback(Boom.notFound())
            }
            reaction.usernames = [username]
            if(comment.reactions) {
                let found = false;
                for(let i=0; i<comment.reactions.length; i++) {
                    if(comment.reactions[i]["id"] == reaction.id) {
                        found = true;
                        let userIndex = comment.reactions[i]["usernames"].indexOf(username)
                        if(userIndex == -1) {
                            comment.reactions[i]["usernames"].push(username)
                        } else {
                            toggleOff=true
                            if(comment.reactions[i]["usernames"].length == 1) {
                                comment.reactions.splice(i,1)
                            } else {
                                comment.reactions[i]["usernames"].splice(userIndex,1)
                            }
                        }
                        break
                    }
                }
                if(!found) {
                    comment.reactions.push(reaction)
                }

            } else {
                comment.reactions = [reaction]
            }

            if(comment.reactions.length >= 10) {
                return callback(Boom.badRequest("too many reactions"))
            }

            const updateParams = {
                '$set': {
                    "comments.$.reactions": comment.reactions
                },
                '$inc': {
                    "reactionsLength": 1
                }
            }
            this.findOneAndUpdate({_id: Mongodb.ObjectId(id), "comments": { $elemMatch: {_id: Mongodb.ObjectId(commentId)}}}, updateParams, callback)

        })
    }


    // static removeReaction(id, user_id, username, reaction, callback) {
    //     const updateParams = {
    //         '$pull': {
    //             "reactions": {
    //                 user_id: user_id,
    //                 id: reaction.id
    //             }
    //         },
    //         '$inc': {
    //             "reactionsLength": -1
    //         }
    //     }
    //     this.findByIdAndUpdate(id, updateParams, callback)
    // }

    static addComment(id, params, callback) {
        params["_id"] = this.ObjectId();
        params["time"] = new Date();

        let updateParams = { '$push':
            {
                "comments": params
            },
            $inc: {
                "commentsCount": 1,
                "wagerCoins": params.coins || 0
            }
        };
        this.findByIdAndUpdate(id, updateParams, (err, pred) => {
            // if someone else left a comment, send a raven
            let message, type
            if(params.author != pred.author && params.coins) {
                message = "A user has wagered " + params.coins + " on your prediction "
                type = "doubledown"
            } else if(params.author != pred.author){
                message = "A user commented on your prediction"
                type = "newcomment"
            } else {
                return callback(pred)
            }
            const userMessageUpdate = {
                $push: {
                    messages: {
                        message: message,
                        dismissed: false,
                        seen: false,
                        type: type,
                        // in real life, dont expose ids to the user
                        link: "/account/predictions?id="+pred._id,
                        _id: Mongodb.ObjectId()
                    }
                }
            }
// db.users.updateMany({"characters.name": "Petyr Baelish (Littlefinger)"}, {$inc: {coins: 20}})

// db.users.updateMany({"characters.name": "Petyr Baelish (Littlefinger)"},{ $push: { messages: { message: "Littlefinger has schemed his last scheme. +20 coins for dies next", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})
// db.users.updateMany({"characters.name": "Tormund Giantsbane"},{ $push: { messages: { message: "I'm gonna assume that Tormund did not survive the ice breath and Wall Shattering down. +20 coins for dies next", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})

            // "dothrak_n_roll","roosewitherspoon","jonmyfatherisntwhoithoughtitwassnow","iainharlow","lordcommandertarly"
            // thefunyunknight,presidentlittlefinger,iainharlow,snackskelly
            // db.users.updateMany({"house.name": "Lannister"}, { $push: { messages: { message: "Cersei has lasted the entire season. You, her loyal cousin, have stuck with her to the end. +6 coins banked", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})
            // db.users.updateMany({"house.name": "Targaryen"}, { $push: { messages: { message: "We wished we lived in Westeros where the beer flows like wine. -2 coins for Tyrion's drinking problem", dismissed: false, seen: false, type: "false", _id: ObjectId()}}})
            // db.users.updateMany({"house.name": "Greyjoy"}, { $push: { messages: { message: "Let us hope Euron is spending his off-screen time finding a water dragon. -2 coins for House Greyjoy", dismissed: false, seen: false, type: "false", _id: ObjectId()}}})
            // db.users.updateMany({"house.name": "White Walkers"}, { $push: { messages: { message: "FINALLY south of the Wall. +9 coins banked, but didn't you think this house was going to get more?", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})
// approvalI have something for each and every one of you, Privately tweet your address to @ironwagers for a PRIZE. Also send me anything funny or otherwise I can put for 'praise' on the /about page for next year.

            // db.users.updateMany({}, { $push: { messages: { message: "This season has been Thronesy as fuck. Final scores are up on the leaderboard -- congrats to iron_heist, iainharlow, and lordcommandertarly for wargin' their way to the top. Props to Houses Stark, Targaryen, and Lannister for making bank from bonuses. Wild card winners thronestradamus, for the crazy Sandor Clegane=Azor Azai prediction, and roosewitherspoon for best username.", link: "/account/leaderboard", type: "housejoin", _id: ObjectId()}}})

// db.users.updateMany({}, { $push: { messages: { message: "I have something for each and every one of you, privately tweet your address to @ironwagers for a PRIZE. Also send me anything funny or otherwise I can put for 'praise' on the /about page for next year.", link: "https://twitter.com/ironwagers", type: "approval", _id: ObjectId()}}})

            // db.users.updateMany({}, { $push: { messages: { message: "Also, a few dies next updates: Benjen, Thoros, and Viserion. If you have a dead person in your team, click to remove and add a new, not dead person.", dismissed: false, seen: false, type: "housejoin", _id: ObjectId()}}})

            // db.users.updateMany({"house.name": "Stark"}, { $push: { messages: { message: "Oooh! Twist. But I will miss Littlefinger for next season. +2 banked for the official House Stark Executioner", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})
            // db.users.findOneAndUpdate({"username": "gerosan"}, { $push: { messages: { message: "The Iron Bank has reviewed your petition, and decided your prediction 'After what the Hound seeing in the fire, the Brotherhood change course and head north.' has indeed come true. +5 coins banked", dismissed: false, seen: false, type: "true", _id: ObjectId()}}})

            const userFindParam = {
                _id: Mongodb.ObjectId(pred.user_id)
            }

            // WTF
            MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userMessageUpdate, (err, user) => {
                if (err) {
                    return callback(err);
                }
                callback(pred);
            });
        })
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
    static updateStandingPredictionUser(author, pred, wager, callback) {
        const userUpdate = {
            $push: {
                messages: {
                    message: "The wager " + pred.text +" has been approved by the Iron Bank. Watch and see if it comes true!",
                    dismissed: false,
                    seen: false,
                    type: "approval",
                    _id: Mongodb.ObjectId()
                }
            }
        }
        const userFindParam = {
            username: author
        }

        // WTF
        MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
            if (err) {
                return callback(err);
            }
            callback(pred);
        });
    }

    // send message to user
    // increment availableCoins
    static updateRejectedPredictionUser(author, pred, wager, callback) {
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
            username: author
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
    static updateTruePredictionUser(author, pred, wager, callback) {
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
            username: author
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
    static updateFalsePredictionUser(author, pred, wager, callback) {

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
            username: author
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
            this.updateRejectedPredictionUser(wager.author, pred, wager, callback)
        } else if (request.payload.status == 'standing') {
            this.updateStandingPredictionUser(wager.author, pred, wager, callback)
        } else if (request.payload.status == 'won') {
            this.updateTruePredictionUser(wager.author, pred, wager, callback)
        } else if (request.payload.status == 'lost') {
            this.updateFalsePredictionUser(wager.author, pred, wager, callback)
        }
    }

    static awardPrediction(request, callback) {
        const update = {
            $push: {
                awards: request.payload.award
            }
        }

        const findParam = {
            _id: Mongodb.ObjectId(request.params.id),
        }

        Prediction.findOneAndUpdate(findParam, update, (err, pred) => {
            if (err) {
                return callback(err);
            }
            const userUpdate = {
                $inc: {
                    coins: 25
                },
                $push: {
                    messages: {
                        message: "Your Valyrian Steel wager " + pred.text +" has been deemed very thronesy! +25 coins banked",
                        dismissed: false,
                        seen: false,
                        type: "award",
                        _id: Mongodb.ObjectId()
                    }
                }
            }
            const userFindParam = {
                _id: Mongodb.ObjectId(pred.user_id)
            }
            MongoModels.db.collection('users').findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
                if (err) {
                    return callback(err);
                }
                callback(pred)
            });
        });
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

            Wager.find({predictionId: Mongodb.ObjectId(request.params.id)}, (err, wagers) => {
                if (err) {
                    return callback(err);
                }
                console.log("here are all wagers")
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
                    x+=1;
                });
                Async.auto(tasks, (err, results) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(results);
                });
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
