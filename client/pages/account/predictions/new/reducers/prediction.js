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
        const stateUpdates = {}
        if (action.err) {
            stateUpdate.error = action.err
            stateUpdate.loading = false
        }

        return ObjectAssign({}, state, stateUpdates);
    }

    if (action.type == Constants.CREATE_WAGER_RESPONSE) {
        const stateUpdates = {
            hydrated: true,
            loading: false,
            showSaveSuccess: !action.err,
            error: action.err,
            data: action.response.data,
            pages: action.response.pages,
            items: action.response.items
        }


        return ObjectAssign({}, state, stateUpdates)
    }

    return state;
};


module.exports = reducer;
