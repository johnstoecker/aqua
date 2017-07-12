'use strict';
const Navbar = require('./navbar.jsx');
const PropTypes = require('prop-types');
const React = require('react');


const propTypes = {
    activeTab: PropTypes.string,
    children: PropTypes.node,
    feet: PropTypes.node,
    neck: PropTypes.node,
    title: PropTypes.string
};

class DefaultLayout extends React.Component {
    render() {

        const year = new Date().getFullYear();

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:title" content="Iron Wagers"/>
                    <meta property="og:description" content="A Weekly Game of Thronesy Predictions"/>
                    <meta property="og:image" content="https://ironwagers.com/public/media/iron_throne_text.png"/>
                    <meta property="og:url" content="https://ironwagers.com"/>
                    <link rel="stylesheet" href="/public/core.min.css" />
                    <link rel="stylesheet" href="/public/layouts/default.min.css" />
                    <link rel="stylesheet" href="/public/pages/components.min.css" />,
                    <link rel="shortcut icon" href="/public/media/favicon.ico" />
                    <script async defer src="https://buttons.github.io/buttons.js"></script>
                    {this.props.neck}
                </head>
                <body>
                    <Navbar activeTab={this.props.activeTab} />
                    <div className="page">
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="footer">
                        <div className="container">
                            <span className="copyright pull-right">
                                <a className="github-button" href="https://github.com/johnstoecker/ironwagers/issues" data-icon="octicon-issue-opened" aria-label="Issue johnstoecker/ironwagers on GitHub">Help!</a>
                            </span>
                            <ul className="links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <script src="/public/core.min.js"></script>
                    {this.props.feet}
                </body>
            </html>
        );
    }
}

DefaultLayout.propTypes = propTypes;


module.exports = DefaultLayout;
