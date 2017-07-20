'use strict';
const Constants = require('./constants');
const ObjectAssign = require('object-assign');
const Redux = require('redux');


const initialState = {
    loading: false,
    success: false,
    error: undefined,
    hasError: {},
    help: {},
    allChars: [],
    myChars: []
};
const reducer = function (state, action) {

    if (action.type === Constants.GET_CHARACTERS_RESPONSE) {
        return ObjectAssign({}, state, {
            loading: false,
            success: !action.err,
            allChars: action.response.data
        });
    }


    if (action.type === Constants.SAVE_CHARACTERS_RESPONSE) {
        return ObjectAssign({}, state, {
            loading: false,
            success: !action.err,
            myChars: action.response.characters
        });
    }

    if (action.type === Constants.GET_MY_CHARACTERS_RESPONSE) {
        console.log(action)
        return ObjectAssign({}, state, {
            loading: false,
            success: !action.err,
            myChars: action.response.characters
        });
        return state;
    }

    return state;
};


module.exports = Redux.createStore(reducer, initialState);
