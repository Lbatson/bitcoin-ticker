/** @jsx React.DOM */
(function () {
    'use strict';
    var Color = require('../mixins/Color');

    var Price = React.createClass({
        mixins: [Color],
        getInitialState: function () {
            return {
                price: this.props.price,
                style: {}
            };
        },
        componentWillReceiveProps: function (nextProps) {
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

    module.exports = Price;
})();
