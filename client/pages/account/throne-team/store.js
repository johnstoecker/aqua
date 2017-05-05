'use strict';
const ThroneTeamDetails = require('./reducers/throne-team-details');
const Characters = require('./reducers/characters')
const Redux = require('redux');


module.exports = Redux.createStore(
    Redux.combineReducers({
        throneTeamDetails: ThroneTeamDetails,
        characters: Characters
    })
);
