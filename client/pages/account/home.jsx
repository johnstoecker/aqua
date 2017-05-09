'use strict';
const React = require('react');
const Actions = require('./settings/actions');
const Store = require('./settings/store');


class HomePage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getUser();

        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {
        console.log(Store.getState());
        this.setState(Store.getState());
    }

    render() {
        // console.log({this.state})
        return (
            <section className="section-home container">
                <div className="row">
                    <div className="col-sm-7">
                        <h1 className="page-header">My account</h1>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.coins}
                                    </div>
                                    <div className="stat-label">Coins</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.reservedCoins}
                                    </div>
                                    <div className="stat-label">Reserved</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.user.coins - this.state.user.reservedCoins}
                                    </div>
                                    <div className="stat-label">Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
