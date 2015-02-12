/** @jsx React.DOM */
(function () {
    'use strict';
    var React = require('react');

    var PriceComponent = React.createClass({
        propTypes: {
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        getInitialState: function () {
            return {
                price: null,
                style: {}
            };
        },
        componentWillReceiveProps: function (nextProps) {
            var color = 'black';
            if (this.state.price !== null && !nextProps.reset) {
                if (nextProps.price > this.state.price) {
                    color = 'green';
                } else if (nextProps.price < this.state.price) {
                    color = 'red';
                }
            }
            this.setState({
                price: nextProps.price,
                style: {
                    color: color
                }
            });
        },
        render: function () {
            return (
                <span style={this.state.style}>
                    {this.state.price ? this.state.price.toFixed(2) : 'Loading...'}
                </span>
            );
        }
    });

    module.exports = PriceComponent;
})();
