'use strict';
const TopUsers = require('./reducers/top_users')
const TopPredictions = require('./reducers/top_predictions')
const Redux = require('redux');

module.exports = Redux.createStore(
    Redux.combineReducers({
        topUsers: TopUsers,
        topPredictions: TopPredictions,
        showTab: (state = {}) => state
    }),
    { showTab: "users"}
);
