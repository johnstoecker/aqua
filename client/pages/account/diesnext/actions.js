'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static saveCharacters(chars) {
        console.log(chars)
        ApiActions.put(
            '/api/characters/my',
            chars,
            Store,
            Constants.SAVE_CHARACTERS,
            Constants.SAVE_CHARACTERS_RESPONSE,
            (err, response) => {

                if (!err) {
                    window.location.href = '/account';
                }
            }
        )
    }

    static getMyCharacters() {
        ApiActions.get(
            '/api/characters/my',
            null,
            Store,
            Constants.GET_MY_CHARACTERS,
            Constants.GET_MY_CHARACTERS_RESPONSE
        )
    }

    static getCharacters() {
        ApiActions.get(
            '/api/characters',
            null,
            Store,
            Constants.GET_CHARACTERS,
            Constants.GET_CHARACTERS_RESPONSE
        )
    }
}


module.exports = Actions;
