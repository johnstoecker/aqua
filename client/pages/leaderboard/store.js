'use strict';
const TopUsers = require('./reducers/top_users')
const Redux = require('redux');

module.exports = Redux.createStore(
    Redux.combineReducers({
        topUsers: TopUsers
    })
);
