'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const Mongodb = require('mongodb');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Prediction = server.plugins['hapi-mongo-models'].Prediction;
    const Wager = server.plugins['hapi-mongo-models'].Wager;
    const User = server.plugins['hapi-mongo-models'].User;

    server.route({
        method: 'GET',
        path: '/predictions',
        config: {
            auth: {
                strategy: 'session',
                scope: ['account', 'admin']
            },
        },
        handler: function (request, reply) {
            const query = {};
            if (request.query.author) {
                query.author = new RegExp('^.*?' + EscapeRegExp(request.query.author) + '.*$', 'i');
            }
            if (request.query.status) {
                query.status = request.query.status
            }
            if (request.query.userId) {
                query.userId = request.query.userId
            }
            if (request.query.text) {
                query.text = request.query.text
            }
            const fields = request.query.fields;
            const sort = request.query.sort || "-_id";
            const limit = request.query.limit;
            const page = request.query.page;
            console.log(query)
            Prediction.pagedFind(query, fields, sort, limit, page, (err, results) => {
                // console.log(results)
                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/predictions/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const id = request.auth.credentials.user._id.toString();
            console.log(id);

            Prediction.findByUserId(id, (err, predictions) => {

                if (err) {
                    return reply(err);
                }

                if (!predictions) {
                    return reply(Boom.notFound());
                }

                reply(predictions);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/predictions/{id}/wagers',
        config: {
            auth: {
                strategy: 'session',
                scope: ['account' ]
            }
        },
        handler: function (request, reply) {
            Wager.create(request.auth.credentials.user._id.toString(), request.params.id, parseInt(request.payload.coins), (err, prediction)=>{
                if (err) {
                    return reply(err)
                }
                reply(prediction)
            } )
        }
    })

    // TODO: update a predictions
    // Validate this, make sure it is for the current user
    // Make sure it changes status back to pending
    // Cant update prediction that is true or false
    // Can only update text/tags

    server.route({
        method: 'PUT',
        path: '/predictions/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            }
        },
        handler: function(request, reply) {
            const update = {
                $set: {
                    status: request.payload.status
                }
            }
            const findParam = {
                _id: Mongodb.ObjectId(request.params.id),
            }
            Prediction.findOne(findParam, (err, pred) => {
                if (err) {
                    return reply(err);
                }
                console.log(pred)

                if (request.payload.status =='rejected') {
                    // send message to user
                    // increment availableCoins

                    const userUpdate = {
                        $inc: {
                            availableCoins: pred.coins
                        },
                        $push: {
                            messages: {
                                message: "Your prediction " + pred.text +" has been rejected by the Iron Bank. Please check the help page for prediction guidelines.",
                                dismissed: false,
                                _id: Mongodb.ObjectId()
                            }
                        }
                    }
                    const userFindParam = {
                        _id: Mongodb.ObjectId(pred.user_id)
                    }
                    User.findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
                        if (err) {
                            return reply(err);
                        }
                        Prediction.findOneAndUpdate(findParam, update, (err, prediction) => {
                            if (err) {
                                return reply(err);
                            }
                            reply(prediction);
                        });
                    });

                } else if (request.payload.status == 'standing') {
                    // send message to user
                    // decrement availableCoins, increase reservedCoins

                    const userUpdate = {
                        $inc: {
                            availableCoins: -pred.coins,
                            reservedCoins: pred.coins
                        },
                        $push: {
                            messages: {
                                message: "Your prediction " + pred.text +" has been approved by the Iron Bank.",
                                dismissed: false,
                                _id: Mongodb.ObjectId()
                            }
                        }
                    }
                    const userFindParam = {
                        _id: Mongodb.ObjectId(pred.user_id)
                    }
                    User.findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
                        if (err) {
                            return reply(err);
                        }
                        Prediction.findOneAndUpdate(findParam, update, (err, prediction) => {
                            if (err) {
                                return reply(err);
                            }
                            reply(prediction);
                        });
                    });

                } else if (request.payload.status == 'true') {
                    // send message to user
                    // decrement availableCoins, decrese reserved
                    // TODO:
                    // do this for all wagers on this pred!

                    const userUpdate = {
                        $inc: {
                            coins: pred.coins,
                            reservedCoins: -pred.coins
                        },
                        $push: {
                            messages: {
                                message: "Your prediction " + pred.text +" has come true! Coins banked: +" + pred.coins,
                                dismissed: false,
                                _id: Mongodb.ObjectId()
                            }
                        }
                    }
                    const userFindParam = {
                        _id: Mongodb.ObjectId(pred.user_id)
                    }
                    User.findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
                        if (err) {
                            return reply(err);
                        }
                        Prediction.findOneAndUpdate(findParam, update, (err, prediction) => {
                            if (err) {
                                return reply(err);
                            }
                            reply(prediction);
                        });
                    });


                } else if (request.payload.status == 'false') {
                    // send message to user
                    // decrement reservedCoins
                    //

                    const userUpdate = {
                        $inc: {
                            reservedCoins: -pred.coins
                        },
                        $push: {
                            messages: {
                                message: "Your prediction " + pred.text +" has not come true.",
                                dismissed: false,
                                _id: Mongodb.ObjectId()
                            }
                        }
                    }
                    const userFindParam = {
                        _id: Mongodb.ObjectId(pred.user_id)
                    }
                    User.findOneAndUpdate(userFindParam, userUpdate, (err, user) => {
                        if (err) {
                            return reply(err);
                        }
                        Prediction.findOneAndUpdate(findParam, update, (err, prediction) => {
                            if (err) {
                                return reply(err);
                            }
                            reply(prediction);
                        });
                    });



                }

                console.log(findParam)


            })
        }
    })


    server.route({
        method: 'POST',
        path: '/predictions/{id}/comments',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {

            const params = {
                user_id: request.auth.credentials.user._id.toString(),
                author: request.auth.credentials.user.username.toString(),
                //authorHouse: request.auth.credentials.user.house.toString(),
                text : request.payload.text
            }

            Prediction.addComment(request.params.id, params, (err, prediction) => {
                if (err) {
                    return reply(err);
                }

                reply(prediction)
            })
        }
    })

    server.route({
        method: 'DELETE',
        path: '/predictions/{predictionId}/comments/{commentId}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {

            const user_id = request.auth.credentials.user._id.toString()

            // TODO: how to get second id here?
            Prediction.deleteCommentFromPrediction(request.params.predictionId, request.params.commentId, user_id, (err, prediction) => {
                if (err) {
                    return reply(err);
                }

                reply(prediction)
            })
        }
    })

    server.route({
        method: 'POST',
        path: '/predictions/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
        },
        handler: function (request, reply) {
            const params = {
              user_id : request.auth.credentials.user._id.toString(),
              author: request.auth.credentials.user.username.toString(),
              authorHouse: (request.auth.credentials.user.house && request.auth.credentials.user.house.name) || "unaffiliated",
              text : request.payload.text,
              tags : request.payload.tags,
              season: 6,
              status: 'pending',
              coins: parseInt(request.payload.coins),
              comments: []
            }

            if(params.coins < 1) {
                return reply(Boom.badRequest("Incorrect coins"))
            }
            const userUpdate = {
                $inc: {
                    availableCoins: -params.coins,
                    reservedCoins: params.coins
                }
            }
            const findParam = {
                _id: Mongodb.ObjectId(params.user_id),
                availableCoins: { $gt: params.coins-1 }
            }
            console.log(findParam)
            User.findOneAndUpdate(findParam, userUpdate, (err, user) => {

                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.badRequest("Not enough coins"))
                }

                Prediction.insertOne(params, (err, prediction) => {

                    if (err) {
                        return reply(err);
                    }

                    const wagerParams = {
                        userId: params.user_id,
                        user: request.auth.credentials.user,
                        coins: params.coins,
                        predictionId: prediction._id,
                        status: 'pending'
                    }
                    Wager.insertOne(wagerParams, (err, docs) => {
                        if (err) {
                            return reply(err);
                        }

                        reply(prediction)
                    })
                });
            })
        }
    });

    next();
};


exports.register = function (server, options, next) {

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'predictions'
};
