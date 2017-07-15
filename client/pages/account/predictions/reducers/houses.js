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

    if (action.type === Constants.GET_HOUSESTATS) {
        console.log("got")
        return ObjectAssign({}, state, {
            hydrated: false,
            loading: true
        });
    }

    if (action.type === Constants.GET_HOUSESTATS_RESPONSE) {
        console.log("response")
        console.log(state)
        return ObjectAssign({}, state, {
            hydrated: true,
            loading: false,
            data: action.response,
        });
    }


    return state;
};


module.exports = reducer;
