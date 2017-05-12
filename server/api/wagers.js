'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');

const internals = {};

internals.applyRoutes = function (server, next) {

    const Wager = server.plugins['hapi-mongo-models'].Wager;

    server.route({
        method: 'GET',
        path: '/wagers',
        config: {
            auth: {
                strategy: 'session',
                scope: ['account', 'admin']
            },
        },
        handler: function (request, reply) {

            const query = {};
            if (request.query.status) {
                query.status = request.query.status
            }
            if (request.query.userId) {
                query.userId = request.query.userId
            }
            const fields = request.query.fields;
            const sort = request.query.sort;
            const limit = request.query.limit;
            const page = request.query.page;

            Wager.pagedFind(query, fields, sort, limit, page, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/wagers/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
            const id = request.auth.credentials.user._id.toString();
            console.log(id);

            Wager.findByUserId(id, (err, wagers) => {

                if (err) {
                    return reply(err);
                }

                if (!wagers) {
                    return reply(Boom.notFound());
                }

                reply(wagers);
            });
        }
    });

    // TODO: update a wagers
    // Validate this, make sure it is for the current user
    // Make sure it changes status back to pending
    // Cant update wager that is true or false
    // Can only update text/tags

    server.route({
        method: 'POST',
        path: '/wagers/{id}/comments',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {
//                 authorHouse: request.auth.credentials.user.house.toString(),

            const params = {
                user_id: request.auth.credentials.user._id.toString(),
                author: request.auth.credentials.user.username.toString(),
                authorHouse: "Hightower",
                text : request.payload.text
            }

            Wager.addComment(request.params.id, params, (err, wager) => {
                if (err) {
                    return reply(err);
                }

                reply(wager)
            })
        }
    })

    server.route({
        method: 'DELETE',
        path: '/wagers/{wagerId}/comments/{commentId}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            }
        },
        handler: function (request, reply) {

            const user_id = request.auth.credentials.user._id.toString()

            // TODO: how to get second id here?
            Wager.deleteCommentFromWager(request.params.wagerId, request.params.commentId, user_id, (err, wager) => {
                if (err) {
                    return reply(err);
                }

                reply(wager)
            })
        }
    })

    server.route({
        method: 'POST',
        path: '/wagers/my',
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
              text : request.payload.text,
              tags : request.payload.tags,
              season: 6,
              status: 'pending',
              comments: []
            }

            Wager.insertOne(params, (err, wager) => {

                if (err) {
                    return reply(err);
                }

                reply(wager);
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
    name: 'wagers'
};
