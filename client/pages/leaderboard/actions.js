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
};


module.exports = Actions;
