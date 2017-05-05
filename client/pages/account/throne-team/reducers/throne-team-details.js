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
    throneTeam: {
        first: '',
        middle: '',
        last: ''
    }
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_THRONE_TEAM) {
        return ObjectAssign({}, state, {
            loading: true,
            hydrated: false
        });
    }

    if (action.type === Constants.GET_THRONE_TEAM_RESPONSE) {
        const validation = ParseValidation(action.response);

        console.log(action.response);
        return ObjectAssign({}, state, {
            loading: false,
            hydrated: true,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            characters: action.response.characters
        });
    }

    return state;
};

module.exports = reducer;
