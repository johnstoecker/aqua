'use strict';
const PropTypes = require('prop-types');
const React = require('react');


const propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
};


class Alert extends React.Component {
    render() {
        let close, alertLink;

        if (this.props.onClose) {
            close = <button
                type="button"
                className="close"
                onClick={this.props.onClose}>

                &times;
            </button>;
        }
        if (this.props.link) {
            alertLink = <a href={this.props.link} className="fa fa-external-link"></a>
        }

        return (
            <div className={`alert alert-${this.props.type}`}>
                {close}
                {this.props.message}
                {alertLink}
            </div>
        );
    }
}

Alert.propTypes = propTypes;


module.exports = Alert;
