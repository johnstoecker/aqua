'use strict';
const ApiActions = require('../../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');

class Actions {
    static createPrediction(data) {
        ApiActions.post(
            '/api/predictions/my',
            data,
            Store,
            Constants.CREATE_PREDICTION,
            Constants.CREATE_PREDICTION_RESPONSE,
            (err, response) => {

                if (!err) {
                    this.createWager(response[0]._id, data);
                    //
                    // history.replace(window.location);
                    //
                    // window.scrollTo(0, 0);
                }
            }
        );
    }

    static createWager(predictionId, data) {
        // TODO: go to predictions page after create
        ApiActions.post(
            '/api/predictions/'+predictionId+'/wagers',
            data,
            Store,
            Constants.CREATE_WAGER,
            Constants.CREATE_WAGER_RESPONSE
        )
    }
}

module.exports = Actions;
