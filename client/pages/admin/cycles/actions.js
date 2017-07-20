'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static refreshHouse(data) {
        ApiActions.post(
            '/api/houses/refresh',
            data,
            Store,
            Constants.UPDATE_HOUSESTATS,
            Constants.UPDATE_HOUSESTATS_RESPONSE
        );
    }

    static updateCharacters(data) {
        ApiActions.post(
            '/api/characters/refresh',
            data,
            Store,
            Constants.UPDATE_HOUSESTATS,
            Constants.UPDATE_HOUSESTATS_RESPONSE
        );
    }
}

module.exports = Actions;
