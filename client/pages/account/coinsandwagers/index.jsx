'use strict';
const React = require('react');


class CoinsAndWagersPage extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            currentPage: 0
        };
    }


    nextPage() {
        console.log("next")
        this.state.currentPage=((this.state.currentPage+1)%4)
        console.log(this.state)
    }

    prevPage() {
        console.log("prev")
        this.state.currentPage=((this.state.currentPage+3)%4)
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
                                <li onClick={this.goToPage.bind(this, 3)} className={(this.state.currentPage == 3 && "active") || ""}></li>
                            </ol>

                            <div className="carousel-inner">
                                <div className={"item " + (this.state.currentPage == 0 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">COINS & WAGERS</h3>
                                        <h3 className="onboarding-step">Your objective: bank as many coins as possible</h3>
                                        <p>
                                            Coins flow from available -> reserved -> your account. Coins are added to your account if your wager comes true.
                                        </p>
                                    </div>
                                </div>

                                <div className={"item " + (this.state.currentPage == 1 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">AVAILABLE COINS</h3>
                                        <h3 className="onboarding-step">These are coins you can use to make a prediction</h3>
                                        <p>
                                            You have 100 coins to start, and more each week.
                                        </p>
                                    </div>

                                </div>

                                <div className={"item " + (this.state.currentPage == 2 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">RESERVED COINS</h3>
                                        <h3 className="onboarding-step">These are coins reserved for a wager</h3>
                                        <p>
                                            If your wager is approved by the admin, the bet stands. If it is a salt wager, the bet is rejected and coins return to available coins for a new wager.
                                        </p>
                                    </div>

                                </div>

                                <div className={"item " + (this.state.currentPage == 3 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">IRON BANK ACCOUNT COINS</h3>
                                        <h3 className="onboarding-step">These are your winnings</h3>
                                        <p>
                                            If your wager comes true, coins are added here.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="onboarding-arrows-container">
                                <a className="onboarding-arrow" href="#" onClick={this.prevPage.bind(this)}>
                                    <img src="/public/media/left-arrow.png"/>
                                </a>
                                <a className={"onboarding-arrow " + (this.state.currentPage == 3 && "hidden")} href="#" onClick={this.nextPage.bind(this)}>
                                    <img src="/public/media/right-arrow.png"/>
                                </a>
                                <a className={"onboarding-arrow " + (this.state.currentPage != 3 && "hidden")} href="#" onClick={this.startGame}>
                                    I'm ready
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}


module.exports = CoinsAndWagersPage;
