'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');


const internals = {};


internals.applyRoutes = function (server, next) {

    const ThroneTeam = server.plugins['hapi-mongo-models'].ThroneTeam;

    server.route({
        method: 'GET',
        path: '/throne-teams/{id}',
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

            ThroneTeam.findById(request.params.id, (err, throneTeam) => {

                if (err) {
                    return reply(err);
                }

                if (!throneTeam) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(throneTeam);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/throne-teams/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            console.log("hello");
            const id = request.auth.credentials.user._id.toString();
            console.log(id);

            ThroneTeam.findByUserId(id, (err, throneTeam) => {

                if (err) {
                    console.log(err);
                    return reply(err);
                }

                if (!throneTeam) {
                    return reply(Boom.notFound());
                }

                reply(throneTeam);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/throne-teams/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            // validate: {
            //     payload: {
            //         username: Joi.string().token().lowercase().required(),
            //         email: Joi.string().email().lowercase().required(),
            //         password: Joi.string().required()
            //     }
            // },
        },
        handler: function (request, reply) {
            console.log(request);
            console.log("HELLO");

            const user_id = request.auth.credentials.user._id.toString();
            const characters = request.payload.characters;

            ThroneTeam.create(user_id, characters, (err, throneTeam) => {

                if (err) {
                    return reply(err);
                }

                reply(throneTeam);
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/throne-teams/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
        },
        handler: function (request, reply) {

            const user_id = request.auth.credentials.user._id.toString();
            const characters = request.payload.characters;

            const conditions = {
                user_id: user_id
            };

            const updateObject = {
                characters: characters
            }

            ThroneTeam.findOneAndUpdate(conditions, updateObject, (err, throneTeam) => {

                if (err) {
                    return reply(err);
                }

                reply(throneTeam);
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
    name: 'throne-teams'
};
