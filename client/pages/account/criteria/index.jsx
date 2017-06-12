'use strict';
const React = require('react');


class CriteriaPage extends React.Component {
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
                        <div className="carousel col-sm-8" data-ride="carousel" data-interval="false">

                            <ol className="carousel-indicators">
                                <li onClick={this.goToPage.bind(this, 0)} className={(this.state.currentPage == 0 && "active") || ""}></li>
                                <li onClick={this.goToPage.bind(this, 1)} className={(this.state.currentPage == 1 && "active") || ""}></li>
                                <li onClick={this.goToPage.bind(this, 2)} className={(this.state.currentPage == 2 && "active") || ""}></li>
                            </ol>

                            <div className="carousel-inner">
                                <div className={"item " + (this.state.currentPage == 0 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">IRON WAGERS vs. SALT WAGERS</h3>
                                        <p>
                                            Iron wagers are hard, tempered, born of fire -- a brave leap in the dark with sharp metal. Salt wagers are easily scraped off the ground. Salt husbands and salt wives who make salt wagers have no honor.
                                        </p>
                                        <p>
                                            A good wager could conceivably be bet against.
                                        </p>
                                    </div>
                                </div>

                                <div className={"item " + (this.state.currentPage == 1 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">SALT WAGERS</h3>
                                        <p>
                                            Arya will kill someone in season 7.
                                        </p>
                                    </div>

                                </div>

                                <div className={"item " + (this.state.currentPage == 2 && "active") || ""}>
                                    <div className="onboarding-inner">
                                        <h3 className="onboarding-header">IRON WAGERS</h3>
                                        <p>
                                            Arya will kill Sansa in season 7.
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


module.exports = CriteriaPage;
