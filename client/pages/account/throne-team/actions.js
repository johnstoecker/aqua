'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static getMyThroneTeam() {
        ApiActions.get(
            '/api/throne-teams/my',
            undefined,
            Store,
            Constants.GET_THRONE_TEAM,
            Constants.GET_THRONE_TEAM_RESPONSE
        );
    }

    static showCreateNew() {
        Store.dispatch({
            type: Constants.SHOW_CREATE_NEW
        });
    }

    static getCharacters() {
        ApiActions.get(
          '/api/characters',
          undefined,
          Store,
          Constants.GET_CHARACTERS,
          Constants.GET_CHARACTERS_RESPONSE
        )
    }

    static updateThroneTeam(data) {
        ApiActions.put(
          '/api/throne-teams/my',
          data,
          Store,
          Constants.UPDATE_THRONE_TEAM,
          Constants.UPDATE_THRONE_TEAM_RESPONSE
        )
    }

    static createThroneTeam(data) {
        ApiActions.post(
          '/api/throne-teams/my',
          data,
          Store,
          Constants.CREATE_THRONE_TEAM,
          Constants.CREATE_THRONE_TEAM_RESPONSE
        )
    }
}

module.exports = Actions;
