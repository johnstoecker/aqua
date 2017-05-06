'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');


const initialState = {
    hydrated: false,
    loading: false,
    error: undefined,
    data: [],
    pages: {},
    items: {}
};

const reducer = function (state = initialState, action) {

    if (action.type === Constants.ADD_COMMENT_RESPONSE) {
        return ObjectAssign({}, state, {
            hydrated: true,
            loading: false,
            data: action.response.data,
            pages: action.response.pages,
            items: action.response.items
        })
    }

    return state;
};


module.exports = reducer;
