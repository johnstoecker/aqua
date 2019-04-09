'use strict';
const React = require('react');


class IntroPage extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            currentPage: 0
        };
    }


    nextPage() {
        console.log("next")
        this.state.currentPage=((this.state.currentPage+1)%3)
        console.log(this.state)
    }

    prevPage() {
        console.log("prev")
        this.state.currentPage=((this.state.currentPage+2)%3)
    }

    goToPage(page) {
        this.setState({currentPage: page})
    }

    startGame() {
        window.location.href = "/account"
    }

    render() {
        console.log(this.state.currentPage)

        return (
                <div className="container onboarding">
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="/public/media/whitewalker.png"/>
                        </div>
                        <div id="myCarousel" className="carousel col-sm-6" data-ride="carousel" data-interval="false">

                            <ol className="carousel-indicators">
                                <li onClick={this.goToPage.bind(this, 0)} className={(this.state.currentPage == 0 && "active") || ""}></li>
                                <li onClick={this.goToPage.bind(this, 1)} className={(this.state.currentPage == 1 && "active") || ""}></li>
                                <li onClick={this.goToPage.bind(this, 2)} className={(this.state.currentPage == 2 && "active") || ""}></li>
                            </ol>

                            <div className="carousel-inner">
                                <div className={"item " + (this.state.currentPage == 0 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">HOW TO PLAY</h3>
                                        <h3 className="onboarding-step">1. Enter your predictions for Season 8</h3>
                                        <p>
                                            Think Bran is the Night King? Think Tormund and Brienne will finally get together? Write those as predictions.
                                        </p>
                                    </div>
                                </div>

                                <div className={"item " + (this.state.currentPage == 1 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">HOW TO PLAY</h3>
                                        <h3 className="onboarding-step">2. Place a wager on each prediction</h3>
                                        <p>
                                            You have 100 coins to start, and more each week. Your wager amount is a statement of your confidence in a prediction. You can also wager on other players predictions.
                                        </p>
                                    </div>

                                </div>

                                <div className={"item " + (this.state.currentPage == 2 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">HOW TO PLAY</h3>
                                        <h3 className="onboarding-step">3. Watch Game of Thrones!</h3>
                                        <p>
                                            The admin approves or rejects all wagers, based on predefined <a href="/account/criteria">criteria</a>. If your predictions are right, the coins you wagered will be deposited into your Iron Bank Account. The player with the biggest bank at the end of the season wins! Players in the winning house also win the team game!
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="onboarding-arrows-container">
                                <a className="onboarding-arrow" href="#" onClick={this.prevPage.bind(this)}>
                                    <img src="/public/media/left-arrow.png"/>
                                </a>
                                <a className={"onboarding-arrow " + (this.state.currentPage == 2 && "hidden")} href="#" onClick={this.nextPage.bind(this)}>
                                    <img src="/public/media/right-arrow.png"/>
                                </a>
                                <a className={"onboarding-arrow " + (this.state.currentPage != 2 && "hidden")} href="#" onClick={this.startGame}>
                                    I'm ready
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}


module.exports = IntroPage;
