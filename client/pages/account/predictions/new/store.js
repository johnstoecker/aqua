'use strict';
const Prediction = require('./reducers/prediction');
const Redux = require('redux');


module.exports = Redux.createStore(
    Redux.combineReducers({
        prediction: Prediction
    })
);
