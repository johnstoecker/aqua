'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
    hydrated: false,
    loading: false,
    error: undefined,
    tags: [],
    data: [],
    pages: {},
    items: {},
    text: "",
    coins: 10
};

const reducer = function (state = initialState, action) {

    if (action.type === Constants.CREATE_PREDICTION) {
        console.log('create prediction')
        return ObjectAssign({}, state, {
            hydrated: false,
            loading: true
        });
    }


    if (action.type === Constants.CREATE_PREDICTION_RESPONSE) {
        // error: validation.error,
        // hasError: validation.hasError,
        console.log(action)
        let stateUpdates = {
            hydrated: true,
            loading: false,
            showSaveSuccess: !action.err,
            hasError: action.err,
            tags: [],
            prediction: { text: ""},
            text: "",
            coins: 9999
        }
        if (!Array.isArray(action.response)) {
            stateUpdates.error = action.response
        }
        return ObjectAssign({}, state, stateUpdates);
    }

    return state;
};


module.exports = reducer;
