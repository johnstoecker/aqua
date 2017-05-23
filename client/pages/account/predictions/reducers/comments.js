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

    return state;
};


module.exports = reducer;
