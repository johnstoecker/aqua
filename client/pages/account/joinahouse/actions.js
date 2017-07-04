'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static saveHouse(house) {
        console.log(house)
        ApiActions.put(
            '/api/users/my/house',
            house,
            Store,
            Constants.JOIN_HOUSE,
            Constants.JOIN_HOUSE_RESPONSE,
            (err, response) => {

                if (!err) {
                    window.location.href = '/account';
                }
            }
        )
    }
}


module.exports = Actions;
