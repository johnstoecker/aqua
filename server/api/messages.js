'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const MongoModels = require('mongo-models');

const internals = {};


internals.applyRoutes = function (server, next) {

    const User = server.plugins['hapi-mongo-models'].User;
    const Prediction = server.plugins['hapi-mongo-models'].Prediction;

    // mark all read
    server.route({
        method: 'PUT',
        path: '/messages/my',
        config: {
            auth: {
                strategy: 'session',
                scope: 'account'
            }
        },
        handler: function (request, reply) {

            console.log(request.auth.credentials)
            const id = request.auth.credentials.user._id.toString();
            const update = {
                $set: {
                    "messages.$.dismissed": true
                }
            };
            const findOptions = {
                fields: User.fieldsAdapter('username email roles house messages')
            };

            User.findById(id, (err, user) => {
                if (err) {
                    return reply(err);
                }

                user.messages.forEach(function (message) {
                    message.dismissed = true;
                });
                MongoModels.db.collection("users").save(user);

                reply(user);
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
    name: 'messages'
};
