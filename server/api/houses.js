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
    const House = server.plugins['hapi-mongo-models'].House;

    server.route({
        method: 'GET',
        path: '/houses',
        config: {
            auth: {
                strategy: 'session',
                scope: ['account', 'admin']
            },
        },
        handler: function (request, reply) {
            House.find((err, houses) => {
                reply(houses)
            })
        }
    });

    // TODO: make this a cron job
    server.route({
        method: 'POST',
        path: '/houses/refresh',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
        },
        handler: function (request, reply) {
            var name = request.payload.name
            if (["Greyjoy", "Lannister", "Stark", "Targaryen", "White Walkers"].indexOf(name) == -1) {
                return reply(Boom.badRequest("Not a valid house name"));
            }
            const findParam = {
                "house.name": name
            };
            var retVal = {
                userCount: 0,
                numPredictions: 0,
                steelWagers: 0,
                ironWagers: 0,
                saltWagers: 0,
                coins: 0,
                availableCoins: 0,
                lostCoins: 0,
                users: [],
                name: name
            }
            User.find(findParam, (err, users) => {
                users.forEach(function (user) {
                    retVal.userCount += 1;
                    retVal.coins += user.coins || 0;
                    retVal.users.push(user.username);
                    retVal.availableCoins += user.availableCoins || 0;
                    retVal.lostCoins += user.lostCoins || 0;
                });

                const predFindParam = {
                    authorHouse: name
                }

                Prediction.find(predFindParam, (err, predictions) => {
                    for (var i=0; i<predictions.length; i++) {
                        var pred = predictions[i]
                        retVal.numPredictions += 1;
                        if(pred.awards && pred.awards.length>0) {
                            console.log("thronesy!!!!")
                            retVal.steelWagers += 1;
                        }
                        if(pred.status=="won") {
                            retVal.ironWagers += 1;
                        } else if(pred.status=="rejected" || pred.status=="lost") {
                            retVal.saltWagers += 1;
                        }
                    }
                    const houseFindParam = {
                        name: name
                    }
                    House.findOne(houseFindParam, (err, house) => {
                        if (!house) {
                            console.log("no house")
                            retVal.id = Mongodb.ObjectId();
                            House.insertOne(retVal, (err, house) => {
                                if (err) {
                                    reply(err)
                                }
                                reply(house)
                            })
                        } else {
                            console.log(retVal)
                            House.findOneAndUpdate({_id: Mongodb.ObjectId(house._id)}, {$set: retVal}, (err, house) => {
                                if (err) {
                                    reply(err)
                                }
                                reply(house)
                            })
                        }
                    })
                })
            });
        }
    });


    next();
};


exports.register = function (server, options, next) {

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'houses'
};
