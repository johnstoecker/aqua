'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const Characters = require('../../../../data/characters.json');

// const PropTypes = require('prop-types');

class DiesNextPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getCharacters();
        Actions.getMyCharacters();

        this.state = Store.getState();
        // this.setState({myCharacters: props.characters})
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params != nextProps.match.params) {
            this.loadPredictions(nextProps);
        }
    }

    componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    addCharacter(character) {
        if(!this.state.myChars) {
            this.setState({myChars: [character]})
        } else if(this.state.myChars.length >= 3 || this.state.myChars.find((char, i) => char.name == character.name)) {
            return
        } else {
            this.setState({myChars: this.state.myChars.concat(character)})
        }
    }

    removeCharacter(character) {
        this.setState({
          myChars: this.state.myChars.filter((char, i) => char.name !== character.name)
        });
    }

    saveCharacters() {
        Actions.saveCharacters({characters: this.state.myChars});
    }

    render() {
        console.log(this.state)
        // <div href="#" className="house-picker" onClick={this.joinHouse.bind(this, Houses[0])}>
        const myChars = this.state.myChars && this.state.myChars.map((character) => {
            const image = '/public/media/tag_images/'+character.image
            return (<div className="dies-next-user-character hover-zoom"  onClick={this.removeCharacter.bind(this, character)}>
                <div className="dies-next-image-container">
                    <div className="dies-next-image" style={{backgroundImage:`url(${image})`, width: "80px", height: "70px", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPositionY: "center", backgroundPositionX: "center"}}/>
                </div>
                <div className="dies-next-name">{character.name}</div>
            </div>)
        })
        const allChars = this.state.allChars && this.state.allChars.map((character) => {
            const image = '/public/media/tag_images/'+character.image
            return (<div className="dies-next-user-character dies-next-character-picker hover-zoom" onClick={this.addCharacter.bind(this, character)}>
                <div className="dies-next-image-container">
                    <div className="dies-next-image" style={{backgroundImage:`url(${image})`, width: "80px", height: "70px", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPositionY: "center", backgroundPositionX: "center"}}/>
                </div>
                <div className="dies-next-name">{character.name}</div>
                <div className="dies-next-popularity">{character.popularity || 0}</div>
            </div>)
        })
        return (
            <section className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <h1 className="page-header">Valar Morghulis</h1>
                        <p>Choose the top 3 most likely to die next. Gain +20 coins for each death. Change characters whenever you like.</p>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                <div className="row">
                    <div className="col-sm-5">
                        <h3>My To-Die List</h3>
                        {myChars}
                        <button className="btn btn-primary" onClick={this.saveCharacters.bind(this, this.state.myCharacters)}>Save</button>
                    </div>
                    <div className="col-sm-5">
                        <h3>Killable Characters</h3>
                        {allChars}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = DiesNextPage;
