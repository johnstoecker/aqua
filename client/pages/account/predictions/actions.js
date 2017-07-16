'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static getPredictions(params = {}) {
        ApiActions.get(
            '/api/predictions',
            params,
            Store,
            Constants.GET_PREDICTIONS,
            Constants.GET_PREDICTIONS_RESPONSE
        );
    }

    static getPredictionsForUser(params) {
        ApiActions.get(
            '/api/predictions/foruser',
            params,
            Store,
            Constants.GET_PREDICTIONS,
            Constants.GET_PREDICTIONS_RESPONSE
        )
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

    static showDoubleDown(prediction) {
        Store.dispatch
    }

    static getHouseStats() {
        ApiActions.get(
            '/api/houses',
            undefined,
            Store,
            Constants.GET_HOUSESTATS,
            Constants.GET_HOUSESTATS_RESPONSE
        )
    }

    static updatePrediction(data) {
        ApiActions.put(
          '/api/throne-teams/' + data._id,
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

    static addWager(prediction, data) {
        console.log(data)
        ApiActions.post(
            '/api/predictions/'+ prediction._id + '/wagers',
            data,
            Store,
            Constants.ADD_WAGER,
            Constants.ADD_WAGER_RESPONSE
        )
    }

    static addPredictionReaction(id, data) {
        ApiActions.post(
            '/api/predictions/'+id+'/addreaction',
            data,
            Store,
            Constants.ADD_PREDICTION_REACTION,
            Constants.ADD_PREDICTION_REACTION_RESPONSE
        )
    }

    static addPredictionCommentReaction(id, commentId, data) {
        ApiActions.post(
            '/api/predictions/'+id+'/comments/'+commentId+'/addreaction',
            data,
            Store,
            Constants.ADD_PREDICTION_REACTION,
            Constants.ADD_PREDICTION_REACTION_RESPONSE
        )
    }

    static removePredictionReaction(id, data) {
        ApiActions.post(
            '/api/predictions/'+id+'/removereaction',
            data,
            Store,
            Constants.ADD_PREDICTION_REACTION,
            Constants.ADD_PREDICTION_REACTION_RESPONSE
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

    static getScopedUser(username) {
        ApiActions.get(
            '/api/users/username/' + username,
            undefined,
            Store,
            Constants.GET_SCOPED_USER,
            Constants.GET_SCOPED_USER_RESPONSE
        )
    }
}

module.exports = Actions;
