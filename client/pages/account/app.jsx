'use strict';
const Footer = require('./footer.jsx');
const Home = require('./home.jsx');
const Navbar = require('./navbar.jsx');
const NotFound = require('./not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Settings = require('./settings/index.jsx');
const IntroPage = require('./intro/index.jsx');
const CriteriaPage = require('./criteria/index.jsx');
const CoinsAndWagersPage = require('./coinsandwagers/index.jsx')
const ThroneTeam = require('./throne-team/index.jsx')
const Predictions = require('./predictions/index.jsx')
const NewPrediction = require('./predictions/new/index.jsx')

const Route = ReactRouter.Route;
const Router = ReactRouter.BrowserRouter;
const Switch = ReactRouter.Switch;

const App = (
    <Router>
        <div>
            <Route component={Navbar} />
            <Switch>
                <Route exact path="/account" component={Home} />
                <Route exact path="/account?onboard=true" component={Home} />
                <Route path="/account/intro" component={IntroPage} />
                <Route path="/account/criteria" component={CriteriaPage} />
                <Route path="/account/coinsandwagers" component={CoinsAndWagersPage} />
                <Route path="/account/settings" component={Settings} />
                <Route path="/account/throne-team" component={ThroneTeam} />
                <Route path="/account/predictions/new" component={NewPrediction} />
                <Route path="/account/predictions/user/:username" component={Predictions} />
                <Route path="/account/predictions/house/:house" component={Predictions} />
                <Route path="/account/predictions" component={Predictions} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </div>
    </Router>
);


module.exports = App;
