'use strict';
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Character = require('./character');

class ThroneTeam extends MongoModels {
    static create(user_id, characters, callback) {

        const document = {
            user_id: user_id,
            characters: characters
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }

            callback(null, docs[0]);
        });
    }

    static findByUserId(id, callback) {
        const query = { 'user_id': id };
        this.findOne(query, callback);
    }

    static findByUsername(username, callback) {

        const query = { 'user.name': username.toLowerCase() };

        this.findOne(query, callback);
    }
}


ThroneTeam.collection = 'throneTeams';


ThroneTeam.schema = Joi.object().keys({
    _id: Joi.object(),
    user: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().lowercase().required()
    }),
    name: Joi.string().required(),
    characters: Joi.array().items(Character.schema),
    timeCreated: Joi.date()
});


ThroneTeam.indexes = [
    { key: { 'user.id': 1 } },
    { key: { 'user.name': 1 } }
];


module.exports = ThroneTeam;
