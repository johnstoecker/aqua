'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const ParseValidation = require('../../../../helpers/parse-validation');


const initialState = {
    hydrated: false,
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    username: '',
    email: '',
    coins: '-',
    characters: [],
    reservedCoins: '-'
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_USER) {
        return ObjectAssign({}, state, {
            loading: true,
            hydrated: false
        });
    }

    if (action.type === Constants.GET_USER_RESPONSE) {
        console.log(action.response)
        const validation = ParseValidation(action.response);
        return ObjectAssign({}, state, {
            loading: false,
            hydrated: true,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            username: action.response.username,
            house: action.response.house,
            email: action.response.email,
            coins: action.response.coins,
            characters: action.response.characters,
            availableCoins: action.response.availableCoins,
            reservedCoins: action.response.reservedCoins
        });
    }

    return state;
};


module.exports = reducer;
