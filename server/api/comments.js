'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');

const internals = {};

internals.applyRoutes = function (server, next) {

    const Comment = server.plugins['hapi-mongo-models'].Comment;

    server.route({
        method: 'GET',
        path: '/characters',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            validate: {
                query: {
                    name: Joi.string().allow(''),
                    isAlive: Joi.string().allow(''),
                    house: Joi.string().allow(''),
                    fields: Joi.string(),
                    sort: Joi.string().default('_id'),
                    limit: Joi.number().default(20),
                    page: Joi.number().default(1)
                }
            }
        },
        handler: function (request, reply) {

            const query = {};
            if (request.query.name) {
                query.name = new RegExp('^.*?' + EscapeRegExp(request.query.name) + '.*$', 'i');
            }
            if (request.query.isAlive) {
                query.isAlive = request.query.isAlive === 'true';
            }
            const fields = request.query.fields;
            const sort = request.query.sort;
            const limit = request.query.limit;
            const page = request.query.page;

            Character.pagedFind(query, fields, sort, limit, page, (err, results) => {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: '/characters/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            Character.findById(request.params.id, (err, character) => {

                if (err) {
                    return reply(err);
                }

                if (!character) {
                    return reply(Boom.notFound('Document not found.'));
                }

                reply(character);
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
    name: 'characters'
};
