'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const Dotenv = require('dotenv');
const Mongodb = require('mongodb');

const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;
    const Prediction = server.plugins['hapi-mongo-models'].Prediction;
    const Wager = server.plugins['hapi-mongo-models'].Wager;
    const Character = server.plugins['hapi-mongo-models'].Character;


    server.route({
        method: 'GET',
        path: '/users/top',
        handler: function (request, reply) {

            const query = {};
            const fields = "coins username house";
            const sort = "-coins";
            const limit = 40;
            const page = 1;

            User.pagedFind(query, fields, sort, limit, page, (err, results) => {

                if (err) {
                    return reply(err);
                }
                console.log(results)

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/users',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                query: {
                    username: Joi.string().allow(''),
                    isActive: Joi.string().allow(''),
                    role: Joi.string().allow(''),
                    fields: Joi.string(),
                    sort: Joi.string().default('_id'),
                    limit: Joi.number().default(20),
                    page: Joi.number().default(1)
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            const query = {};
            if (request.query.username) {
                query.username = new RegExp('^.*?' + EscapeRegExp(request.query.username) + '.*$', 'i');
            }
            if (request.query.isActive) {
                query.isActive = request.query.isActive === 'true';
            }
            if (request.query.role) {
                query['roles.' + request.query.role] = { $exists: true };
            }
            const fields = request.query.fields;
            const sort = request.query.sort;
            const limit = request.query.limit;
            const page = request.query.page;

            User.pagedFind(query, fields, sort, limit, page, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/users/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            User.findById(request.params.id, (err, user) => {

                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/users/username/{username}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {

            const fields = User.fieldsAdapter('username coins reservedCoins availableCoins house');

            // User.findById(id, fields, (err, user) => {
            User.findOne({ username: request.params.username}, {password: 0, email: 0, roles: 0}, (err, user) => {
                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found. That is strange.'));
                }

                reply(user);
            });
        }
    });




    server.route({
        method: 'GET',
        path: '/users/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const id = request.auth.credentials.user._id.toString();
            // const fields = User.fieldsAdapter('username email roles coins reservedCoins availableCoins house messsages');

            // User.findById(id, fields, (err, user) => {
            User.findById(id, {password: 0}, (err, user) => {
                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found. That is strange.'));
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'POST',
        path: '/users',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                payload: {
                    username: Joi.string().token().lowercase().required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root'),
                {
                    assign: 'usernameCheck',
                    method: function (request, reply) {

                        const conditions = {
                            username: request.payload.username
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Username already in use.'));
                            }

                            reply(true);
                        });
                    }
                }, {
                    assign: 'emailCheck',
                    method: function (request, reply) {

                        const conditions = {
                            email: request.payload.email
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Email already in use.'));
                            }

                            reply(true);
                        });
                    }
                }
            ]
        },
        handler: function (request, reply) {
            // TODO: recaptcha server side verification
            console.log(process.env.RECAPTCHA_KEY)
            if (process.env.RECAPTCHA_KEY) {
                console.log(process.env.RECAPTCHA_KEY);
            }
            const username = request.payload.username;
            const password = request.payload.password;
            const email = request.payload.email;

            User.create(username, password, email, (err, user) => {

                if (err) {
                    return reply(err);
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'PUT',
        path: '/users/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                params: {
                    id: Joi.string().invalid('000000000000000000000000')
                },
                payload: {
                    isActive: Joi.boolean().required(),
                    username: Joi.string().token().lowercase().required(),
                    email: Joi.string().email().lowercase().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root'),
                {
                    assign: 'usernameCheck',
                    method: function (request, reply) {

                        const conditions = {
                            username: request.payload.username,
                            _id: { $ne: User._idClass(request.params.id) }
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Username already in use.'));
                            }

                            reply(true);
                        });
                    }
                }, {
                    assign: 'emailCheck',
                    method: function (request, reply) {

                        const conditions = {
                            email: request.payload.email,
                            _id: { $ne: User._idClass(request.params.id) }
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Email already in use.'));
                            }

                            reply(true);
                        });
                    }
                }
            ]
        },
        handler: function (request, reply) {

            const id = request.params.id;
            const update = {
                $set: {
                    isActive: request.payload.isActive,
                    username: request.payload.username,
                    email: request.payload.email
                }
            };

            User.findByIdAndUpdate(id, update, (err, user) => {

                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'PUT',
        path: '/users/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            validate: {
                payload: {
                    username: Joi.string().token().lowercase().required(),
                    email: Joi.string().email().lowercase().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureNotRoot,
                {
                    assign: 'usernameCheck',
                    method: function (request, reply) {

                        const conditions = {
                            username: request.payload.username,
                            _id: { $ne: request.auth.credentials.user._id }
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Username already in use.'));
                            }

                            reply(true);
                        });
                    }
                }, {
                    assign: 'emailCheck',
                    method: function (request, reply) {

                        const conditions = {
                            email: request.payload.email,
                            _id: { $ne: request.auth.credentials.user._id }
                        };

                        User.findOne(conditions, (err, user) => {

                            if (err) {
                                return reply(err);
                            }

                            if (user) {
                                return reply(Boom.conflict('Email already in use.'));
                            }

                            reply(true);
                        });
                    }
                }
            ]
        },
        handler: function (request, reply) {

            const id = request.auth.credentials.user._id.toString();
            const update = {
                $set: {
                    username: request.payload.username,
                    email: request.payload.email,
                    house: request.payload.house
                }
            };
            const findOptions = {
                fields: User.fieldsAdapter('username email roles')
            };

            User.findByIdAndUpdate(id, update, findOptions, (err, user) => {

                if (err) {
                    return reply(err);
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'PUT',
        path: '/users/{id}/password',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                params: {
                    id: Joi.string().invalid('000000000000000000000000')
                },
                payload: {
                    password: Joi.string().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root'),
                {
                    assign: 'password',
                    method: function (request, reply) {

                        User.generatePasswordHash(request.payload.password, (err, hash) => {

                            if (err) {
                                return reply(err);
                            }

                            reply(hash);
                        });
                    }
                }
            ]
        },
        handler: function (request, reply) {

            const id = request.params.id;
            const update = {
                $set: {
                    password: request.pre.password.hash
                }
            };

            User.findByIdAndUpdate(id, update, (err, user) => {

                if (err) {
                    return reply(err);
                }

                reply(user);
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/users/my/house',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    image: Joi.string().required()
                }
            }
            // TODO: validate house name/image in thing, or just grab from DB?
            // pre: [
            //     AuthPlugin.preware.ensureNotRoot,
            //     {
            //         assign: 'house',
            //         method: function (request, reply) {
            //
            //             User.findById(request.auth.credentials.user._id, (err, user) => {
            //
            //                 if (err) {
            //                     return reply(err);
            //                 }
            //
            //                 if (user.house) {
            //                     return reply(Boom.conflict('House already set.'));
            //                 }
            //
            //                 reply(true);
            //             });
            //         }
            //     }
            // ]
        },
        handler: function (request, reply) {
            let message
            if(request.payload.name == "Greyjoy") {
                message = "The salt in your beard, or merkin, marks you as a great reaver. Pay the iron price and reap thronesy rewards. You have joined House Greyjoy."
            } else if(request.payload.name == "Lannister") {
                message = "Welcome, cousin, to the A Team. You have joined House Lannister"
            } else if(request.payload.name == "White Walkers") {
                message = "Your skin grows chill. Your breath turns to ice, and blue creeps into your eyes. March with us and we will cover the world in everlasting winter. You have become a white walker."
            } else if(request.payload.name == "Stark") {
                message = "A new King in North rises. You have answered his call. You have joined House Stark."
            } else if(request.payload.name == "Targaryen") {
                message = "The Mother of Dragons and Breaker of Chains welcomes you. Serve your Queen and wager well. You have joined House Targaryen."
            } else {
                return reply(Boom.badRequest("Bad house"))
            }
            const id = request.auth.credentials.user._id.toString();
            const update = {
                $set: {
                    house: {
                        name: request.payload.name,
                        image: request.payload.image
                    }
                },
                $push: {
                    messages: {
                        message: message,
                        dismissed: false,
                        seen: false,
                        type: "housejoin",
                        _id: Mongodb.ObjectId()
                    }
                }
            };

            User.findOneAndUpdate({_id: Mongodb.ObjectId(id), house: null}, update, (err, user) => {
                console.log(user)
                if (err) {
                    return reply(err);
                }
                if (!user) {
                    return reply(Boom.badRequest("Already in house"))
                }

                const predictionUpdate = {
                    $set: {
                        authorHouse: request.payload.name
                    }
                }

                Prediction.updateMany({author: user["username"]}, predictionUpdate, (err, count) => {
                    if(err) {
                        return reply(err);
                    }
                    Wager.updateMany({author: user["username"]}, predictionUpdate, (err, count) => {
                        if (err) {
                            return reply(err);
                        }
                        reply(user);
                    })
                })
            });
        }
    });



    server.route({
        method: 'PUT',
        path: '/users/my/password',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            validate: {
                payload: {
                    password: Joi.string().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureNotRoot,
                {
                    assign: 'password',
                    method: function (request, reply) {

                        User.generatePasswordHash(request.payload.password, (err, hash) => {

                            if (err) {
                                return reply(err);
                            }

                            reply(hash);
                        });
                    }
                }
            ]
        },
        handler: function (request, reply) {

            const id = request.auth.credentials.user._id.toString();
            const update = {
                $set: {
                    password: request.pre.password.hash
                }
            };
            const findOptions = {
                fields: User.fieldsAdapter('username email')
            };

            User.findByIdAndUpdate(id, update, findOptions, (err, user) => {

                if (err) {
                    return reply(err);
                }

                reply(user);
            });
        }
    });


    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                params: {
                    id: Joi.string().invalid('000000000000000000000000')
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            User.findByIdAndDelete(request.params.id, (err, user) => {

                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply({ message: 'Success.' });
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
    name: 'users'
};
