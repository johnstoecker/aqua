'use strict';
const Predictions = require('./reducers/predictions');
const User = require('./reducers/user')
const HouseStats = require('./reducers/houses')
const Redux = require('redux');


module.exports = Redux.createStore(
    Redux.combineReducers({
        predictions: Predictions,
        // current user
        user: User,
        houseStats: HouseStats,
        // user for scoping predictions
        scopedUser: User
    })
);
