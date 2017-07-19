/* global window */
'use strict';
const ApiActions = require('../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static topUsers(data) {
        ApiActions.get(
            '/api/users/top',
            undefined,
            Store,
            Constants.TOP_USERS,
            Constants.TOP_USERS_RESPONSE,
            (err, response) => {

                if (!err) {
                    // window.location.href = '/account?onboard=true';
                }
            }
        );
    }

    static topPredictions(data) {
        ApiActions.get(
            '/api/predictions/top',
            undefined,
            Store,
            Constants.TOP_PREDICTIONS,
            Constants.TOP_PREDICTIONS_RESPONSE,
            (err, response) => {

                if (!err) {
                    // window.location.href = '/account?onboard=true';
                }
            }
        );
    }

    static thronesyPredictions(data) {
        ApiActions.get(
            '/api/predictions/thronesy',
            undefined,
            Store,
            Constants.THRONESY_PREDICTIONS,
            Constants.THRONESY_PREDICTIONS_RESPONSE,
            (err, response) => {

                if (!err) {
                    // window.location.href = '/account?onboard=true';
                }
            }
        );
    }

};


module.exports = Actions;
