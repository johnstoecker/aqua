'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
    hydrated: false,
    loading: false,
    error: undefined,
    data: []
};

const reducer = function (state = initialState, action) {

    if (action.type === Constants.TOP_PREDICTIONS) {
        return ObjectAssign({}, state, {
            hydrated: false,
            loading: true
        });
    }

    if (action.type === Constants.TOP_PREDICTIONS_RESPONSE) {
        return ObjectAssign({}, state, {
            hydrated: true,
            loading: false,
            data: action.response.data,
        });
    }


    return state;
};


module.exports = reducer;
