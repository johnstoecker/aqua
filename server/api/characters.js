'use strict';
const AuthPlugin = require('../auth');
const Boom = require('boom');
const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');
const Async = require('async');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Character = server.plugins['hapi-mongo-models'].Character;
    const User = server.plugins['hapi-mongo-models'].User;

    server.route({
        method: 'GET',
        path: '/characters',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
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
            const sort = request.query.sort || "name";
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
        path: '/characters/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
        },
        handler: function (request, reply) {
            console.log("getting my ch")
            const id = request.auth.credentials.user._id.toString();

            // User.findById(id, fields, (err, user) => {
            User.findById(id, {characters: true}, (err, user) => {
                console.log(user)
                if (err) {
                    return reply(err);
                }

                if (!user) {
                    return reply(Boom.notFound('Document not found. That is strange.'));
                }

                reply(user);
            });


            // User.findById(id, {characters: true}, (err,user)=> {
            //     if(err) {
            //         return reply(err)
            //     }
            //     if(!user) {
            //         return Boom.notFound()
            //     }
            //     reply(user)
            // })
        }
    })

    server.route({
        method: 'PUT',
        path: '/characters/my',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin', 'account']
            },
        },
        handler: function (request, reply) {
            var taskId = 0
            if(request.payload.characters.length > 3) {
                return reply(Boom.badRequest("3 characters required"))
            }
            const id = request.auth.credentials.user._id.toString();
            User.findById(id, (err,user)=> {
                const tasks = {}
                if(user.characters) {
                    for(let i=0; i<user.characters.length; i++) {
                        tasks[taskId] = function (done) {
                            Character.findOneAndUpdate({name: user.characters[i].name},{$inc: {popularity: -1}}, (err, result) =>{
                                if (err) {
                                    return err
                                }
                                return result
                            })
                        }
                        taskId+=1;
                    }
                }

                for(let x=0; x<request.payload.characters.length;x++) {
                    tasks[taskId] = function (done) {
                        Character.findOneAndUpdate({name: request.payload.characters[x].name},{$inc: {popularity: 1}}, (err, result) =>{
                            if (err) {
                                return err
                            }
                            return result
                        })
                    }
                    taskId+=1;
                }

                tasks[taskId] = function (done) {
                    User.findByIdAndUpdate(id, {$set: { characters: request.payload.characters}}, (err, result) =>{
                        if (err) {
                            return reply(err)
                        }
                        reply(result)
                    })
                }

                Async.auto(tasks, (err, results) => {
                    if (err) {
                        return reply(err);
                    }
                    reply(results);
                });


            })
        }
    });




    server.route({
        method: 'POST',
        path: '/characters/refresh',
        config: {
            auth: {
                strategy: 'session',
                scope: ['admin']
            },
        },
        handler: function(request, reply) {

            const tasks = {}
            Object.keys(request.payload.characters).forEach((name) => {
                console.log(name)
                console.log(request.payload.characters[name])
                tasks[name] = function (done) {
                    Character.findOne({name: name}, (err, result) => {
                        if (err) {
                            return reply(err)
                        } else {
                            Character.updateOne({name: name, image: request.payload.characters[name]}, { $set: {name: name, image: request.payload.characters[name]}}, {upsert: true}, (err, result) => {
                                if (err) {
                                    return reply(err)
                                }
                                reply(result)
                            })
                        }
                    })
                }
            });
            Async.auto(tasks, (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(results);
            });
        }
    })

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
