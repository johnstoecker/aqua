'use strict';
const React = require('react');
const Actions = require('./settings/actions');
const Store = require('./settings/store');
const Houses = require('../../../data/houses.json');

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
        this.setState({showHouses: !this.state.showHouses})
    }

    joinHouse(house) {
        console.log(house)
        Actions.saveHouse(house);
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    render() {
        let house
        if(this.state.user.house){
            house = (
                <div className="col-sm-4">
                    <div className="well text-center">
                        <div className="stat-value">
                            <img className="house-picker-image" src={"/public/media/tag_images/"+this.state.user.house.image} />
                        </div>
                        <div className="stat-label">House {this.state.user.house.name}</div>
                    </div>
                </div>
            )
        }
        else {
            house = (
                <a href="#" className="col-sm-4" onClick={this.toggleShowHouses.bind(this)}>
                    <div className="well text-center">
                        <div className="stat-value">
                            <div className="fa fa-plus"/>
                        </div>
                        <div className="stat-label">Join a House</div>
                    </div>
                </a>
            )
        }

        const houseImages = Houses.map((houseHash) => {
            return (
                <div className="house-picker-wrapper" key={houseHash.name}>
                    <a href="#" className="house-picker" onClick={this.joinHouse.bind(this, houseHash)}>
                        <img className="house-picker-image" src={"/public/media/tag_images/"+houseHash.image} />
                        <div>{houseHash.name}</div>
                    </a>
                </div>
            )
        });

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
                <div className={this.state.showHouses ? "house-picker-container" : "hidden"}>
                    {houseImages}
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
