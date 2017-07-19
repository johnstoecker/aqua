'use strict';
const TopUsers = require('./reducers/top_users')
const TopPredictions = require('./reducers/top_predictions')
const ThronesyPredictions = require('./reducers/thronesy_predictions')
const Redux = require('redux');

module.exports = Redux.createStore(
    Redux.combineReducers({
        topUsers: TopUsers,
        topPredictions: TopPredictions,
        thronesyPredictions: ThronesyPredictions,
        showTab: (state = {}) => state
    }),
    { showTab: "users"}
);
