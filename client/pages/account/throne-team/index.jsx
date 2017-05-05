'use strict';
const React = require('react');
const Store = require('./store');
const Actions = require('./actions')
const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');


class ThroneTeamPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getCharacters();
        Actions.getMyThroneTeam();

        this.state = Store.getState();
    }

    componentDidMount() {
        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    addCharacter(character) {
        console.log(this.state)
        console.log(character)
        // console.log(Store.getState());
        if (this.state.throneTeamDetails.error == "Not Found") {
          this.state.throneTeamDetails = {
              characters: [character]
          }
          Actions.createThroneTeam(this.state.throneTeamDetails);
        } else {
          this.state.throneTeamDetails.characters.push(character);
          Actions.updateThroneTeam(this.state.throneTeamDetails);
        }
    }

    onStoreChange() {
        this.setState(Store.getState());
    }

    toggleHideAddCharacter() {
        this.setState({hideAddCharacter: true})
    }

    render() {
        let myThroneTeam
        let actions
        if (this.state.throneTeamDetails.error == "Not Found") {
            myThroneTeam = (
                <div>
                    <div>You have not set up a Throne Team. Add five characters!</div>
                </div>
            )
        } else if(this.state.throneTeamDetails.characters){
            console.log(this.state.throneTeamDetails)
            const throneChars = this.state.throneTeamDetails.characters.map((char) => {
                return (
                    <tr key={char._id}>
                        <td>{char.name}</td>
                        <td>{char.house}</td>
                    </tr>
                );
            })
            myThroneTeam = (
              <div className="table-responsive">
                  <table className="table table-striped table-results">
                      <thead>
                          <tr>
                              <th className="stretch">name</th>
                              <th>house</th>
                          </tr>
                      </thead>
                      <tbody>
                          {throneChars}
                      </tbody>
                  </table>
              </div>
            )
        }
        if (!this.state.showAddCharacter && (this.state.throneTeamDetails.error == "Not Found" || (this.state.throneTeamDetails.characters && this.state.throneTeamDetails.characters.length < 5))) {
            actions = (
                <Button inputClasses={{ 'btn-primary': true }} onClick={this.toggleHideAddCharacter.bind(this)}>
                      + Character
                </Button>
            )
        }

        const rows = this.state.characters.data.map((record) => {

            return (
                <tr key={record._id} onClick={this.addCharacter.bind(this, record)}>
                    <td>{record.name}</td>
                    <td>{record.house}</td>
                    <td>{record.alive? '': 'dead'}</td>
                </tr>
            );
        });

        return (
            <section className="container">
                <h1 className="page-header">Throne Team</h1>
                <div className="xxxasdf">5 Characters that will reach the end of the season...because in the game of thrones, mere suvival is victory!</div>
                <div className="row">
                    <div className="col-sm-6">
                      {myThroneTeam}
                      <div className="table-responsive" className={this.state.hideAddCharacter ? '' : 'hidden'}>
                          <table className="table table-striped table-results">
                              <thead>
                                  <tr>
                                      <th className="stretch">name</th>
                                      <th>house</th>
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {rows}
                              </tbody>
                          </table>
                      </div>
                      {actions}
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = ThroneTeamPage;
