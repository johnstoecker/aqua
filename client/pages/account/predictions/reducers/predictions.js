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

    if (action.type === Constants.GET_PREDICTIONS) {
        return ObjectAssign({}, state, {
            hydrated: false,
            loading: true
        });
    }

    if (action.type === Constants.GET_PREDICTIONS_RESPONSE) {
        return ObjectAssign({}, state, {
            hydrated: true,
            loading: false,
            data: action.response.data,
            pages: action.response.pages,
            items: action.response.items
        });
    }


    if (action.type === Constants.ADD_WAGER_RESPONSE) {
        var index = -1;
        for(var i=0; i<state.data.length; i++) {
            if(state.data[i]["_id"] == action.response["_id"]) {
                index = i;
                break;
            }
        }

        return Object.assign({}, state, {
            hydrated: true,
            loading: false,
            pages: action.response.pages,
            items: action.response.items,
            data: state.data.slice(0, index)
                .concat([action.response])
                .concat(state.data.slice(index+1))
        })
    }

    if (action.type === Constants.ADD_COMMENT_RESPONSE) {
        var index = -1;
        for(var i=0; i<state.data.length; i++) {
            if(state.data[i]["_id"] == action.response["_id"]) {
                index = i;
                break;
            }
        }

        return Object.assign({}, state,  {
            hydrated: true,
            loading: false,
            pages: action.response.pages,
            items: action.response.items,
            data: state.data.slice(0, index)
                .concat([action.response])
                .concat(state.data.slice(index+1))
        })
    }

    if (action.type === Constants.ADD_PREDICTION_REACTION_RESPONSE) {
        var index = -1;
        for(var i=0; i<state.data.length; i++) {
            if(state.data[i]["_id"] == action.response["_id"]) {
                index = i;
                break;
            }
        }

        return Object.assign({}, state,  {
            hydrated: true,
            loading: false,
            pages: action.response.pages,
            items: action.response.items,
            data: state.data.slice(0, index)
                .concat([action.response])
                .concat(state.data.slice(index+1))
        })
    }


    if (action.type === Constants.DELETE_COMMENT_RESPONSE) {
        var index = -1;
        for(var i=0; i<state.data.length; i++) {
            if(state.data[i]["_id"] == action.response["_id"]) {
                index = i;
                break;
            }
        }

        return Object.assign({}, state,  {
            hydrated: true,
            loading: false,
            pages: action.response.pages,
            items: action.response.items,
            data: state.data.slice(0, index)
                .concat([action.response])
                .concat(state.data.slice(index+1))
        })
    }

    return state;
};


module.exports = reducer;
