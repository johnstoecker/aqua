'use strict';
const PropTypes = require('prop-types');
const React = require('react');


const propTypes = {
    children: PropTypes.node,
    feet: PropTypes.node,
    neck: PropTypes.node,
    title: PropTypes.string
};

class PlainLayout extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:title" content="Iron Wagers"/>
                    <meta property="og:description" content="A Weekly Game of Thronesy Predictions"/>
                    <meta property="og:image" content="https://ironwagers.com/public/media/iron_throne_text.png"/>
                    <meta property="og:url" content="https://ironwagers.com"/>
                    <link rel="stylesheet" href="/public/core.min.css" />
                    <link rel="shortcut icon" href="/public/media/favicon.ico" />
                    {this.props.neck}
                </head>
                <body>
                    {this.props.children}
                    <script src="/public/core.min.js"></script>
                    {this.props.feet}
                </body>
            </html>
        );
    }
}

PlainLayout.propTypes = propTypes;


module.exports = PlainLayout;
