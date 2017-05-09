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

    toggleShowHouses() {
        this.setState({showHouses: true})
    }

    joinHouse(house) {
        console.log(house)
    //   Actions.updateUser(house);
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {
        console.log(Store.getState());
        this.setState(Store.getState());
    }

    render() {
        let house
        if(this.state.user.house){
            house = (
                <div className="col-sm-4">
                    <div className="well text-center">
                        <div className="stat-value">
                            {this.state.user.house}
                        </div>
                        <div className="stat-label">House</div>
                    </div>
                </div>
            )
        }
        else {
            house = (
                <a href="#" className="col-sm-4" onClick={this.joinHouse.bind(this)}>
                    <div className="well text-center">
                        <div className="stat-value">
                            <div className="fa fa-plus"/>
                        </div>
                        <div className="stat-label">Join a House</div>
                    </div>
                </a>
            )
        }

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
                            {house}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
