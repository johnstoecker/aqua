'use strict';
const Footer = require('./footer.jsx');
const Home = require('./home.jsx');
const Navbar = require('./navbar.jsx');
const NotFound = require('./not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Settings = require('./settings/index.jsx');
const ThroneTeam = require('./throne-team/index.jsx')
const Predictions = require('./predictions/index.jsx')

const Route = ReactRouter.Route;
const Router = ReactRouter.BrowserRouter;
const Switch = ReactRouter.Switch;


const App = (
    <Router>
        <div>
            <Route component={Navbar} />
            <Switch>
                <Route exact path="/account" component={Home} />
                <Route path="/account/settings" component={Settings} />
                <Route path="/account/throne-team" component={ThroneTeam} />
                <Route path="/account/predictions" component={Predictions} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </div>
    </Router>
);


module.exports = App;
