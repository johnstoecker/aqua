'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const Button = require('../../../components/form/button.jsx');
const Characters = require('../../../../data/characters.json')

class CyclesPage extends React.Component {
    constructor(props) {

        super(props);

        this.state = Store.getState();
    }

    deleteComment(comment, pred) {
        Actions.deleteComment(pred._id, comment._id)
    }

    updateHouses() {
        Actions.refreshHouse({name: "Greyjoy"});
        Actions.refreshHouse({name: "Lannister"});
        Actions.refreshHouse({name: "White Walkers"});
        Actions.refreshHouse({name: "Targaryen"});
        Actions.refreshHouse({name: "Stark"});
    }

    updateCharacters() {
        Actions.updateCharacters({characters: Characters})
    }

    render() {
        console.log(this.state)
        return (
            <section className="container">
                <h1 className="page-header">
                    Game of Thrones Season 6 Cycling
                </h1>
                <div className="row">
                    <div className="col-sm-8">
                        <h3>Update houses every weds/sunday night</h3>
                        <Button inputClasses={{ 'btn-primary': true }} onClick={this.updateHouses.bind(this)}>
                              Update Houses
                        </Button>
                        <h3>Update characters when we add a new one</h3>
                        <Button inputClasses={{ 'btn-primary': true }} onClick={this.updateCharacters.bind(this)}>
                              Update Characters
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = CyclesPage;
