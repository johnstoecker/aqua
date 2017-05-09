'use strict';
const React = require('react');


class Footer extends React.Component {
    render() {

        const year = new Date().getFullYear();

        return (
            <div className="footer">
                <div className="container">
                    <span className="copyright pull-right">
                        <a className="github-button" href="https://github.com/johnstoecker/ironwagers/issues" data-icon="octicon-issue-opened" aria-label="Issue johnstoecker/ironwagers on GitHub">Help!</a>
                    </span>
                    <ul className="links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/login/logout">Sign out</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}


module.exports = Footer;
