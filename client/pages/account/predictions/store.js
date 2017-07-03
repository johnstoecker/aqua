'use strict';
const Predictions = require('./reducers/predictions');
const User = require('./reducers/user')
const ScopedUser = require('./reducers/scoped_user')
const HouseStats = require('./reducers/houses')
const Redux = require('redux');


module.exports = Redux.createStore(
    Redux.combineReducers({
        predictions: Predictions,
        // current user
        user: User,
        houseStats: HouseStats,
        // user for scoping predictions, why the hell do I need another reducer file???
        scopedUser: ScopedUser,
        doubleDownCoins: 10
    })
);
