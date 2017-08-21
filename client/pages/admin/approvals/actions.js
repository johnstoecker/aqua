'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static getPendingPredictions() {
        ApiActions.get(
            '/api/predictions?status=pending',
            undefined,
            Store,
            Constants.GET_PENDING_PREDICTIONS,
            Constants.GET_PENDING_PREDICTIONS_RESPONSE
        );
    }

    static getStandingPredictions() {
        ApiActions.get(
            '/api/predictions?status=standing&limit=100',
            undefined,
            Store,
            Constants.GET_STANDING_PREDICTIONS,
            Constants.GET_STANDING_PREDICTIONS_RESPONSE
        );
    }

    static showCreateNew() {
        Store.dispatch({
            type: Constants.SHOW_ADD_PREDICTION
        });
    }

    static getMyPredictions() {
        ApiActions.get(
          '/api/predictions/my',
          undefined,
          Store,
          Constants.GET_MY_PREDICTIONS,
          Constants.GET_MY_PREDICTIONS_RESPONSE
        )
    }

    static updatePrediction(data) {
        ApiActions.put(
          '/api/predictions/' + data._id,
          data,
          Store,
          Constants.UPDATE_PREDICTION,
          Constants.UPDATE_PREDICTION_RESPONSE
        )
    }

    static createPrediction(data) {
        ApiActions.post(
          '/api/throne-teams/my',
          data,
          Store,
          Constants.CREATE_PREDICTION,
          Constants.CREATE_PREDICTION_RESPONSE
        )
    }

    static addComment(id, data) {
        ApiActions.post(
          '/api/predictions/' + id + '/comments',
          data,
          Store,
          Constants.ADD_COMMENT,
          Constants.ADD_COMMENT_RESPONSE
        )
    }

    static deleteComment(predId, commentId) {
        ApiActions.delete(
            '/api/predictions/' + predId + '/comments/' + commentId,
            undefined,
            Store,
            Constants.DELETE_COMMENT,
            Constants.DELETE_COMMENT_RESPONSE
        )
    }

    static getUser() {

        ApiActions.get(
            '/api/users/my',
            undefined,
            Store,
            Constants.GET_USER,
            Constants.GET_USER_RESPONSE
        );
    }
}

module.exports = Actions;
