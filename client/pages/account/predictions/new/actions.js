'use strict';
const ApiActions = require('../../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');

class Actions {
    static createPrediction(data) {
        ApiActions.post(
            '/api/predictions/my',
            data,
            Store,
            Constants.CREATE_PREDICTION,
            Constants.CREATE_PREDICTION_RESPONSE
        );
    }
}

module.exports = Actions;
