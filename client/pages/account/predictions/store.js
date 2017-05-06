'use strict';
const Predictions = require('./reducers/predictions');
const Redux = require('redux');


module.exports = Redux.createStore(
    Redux.combineReducers({
        predictions: Predictions
    })
);
