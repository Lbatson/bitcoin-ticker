/** @jsx React.DOM */
(function () {
    'use strict';
    var React = require('react');

    var PriceComponent = React.createClass({
        propTypes: {
            price: React.PropTypes.number
        },
        getInitialState: function () {
            return {
                price: null,
                style: {}
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (this.state.price !== null) {
                var color = 'black';
                if (nextProps.price > this.state.price) {
                    color = 'green';
                } else if (nextProps.price < this.state.price) {
                    color = 'red';
                }
                this.state.style = {color: color};
            }
            this.setState({price: nextProps.price});
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
