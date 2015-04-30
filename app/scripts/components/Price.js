/** @jsx React.DOM */
(function () {
    'use strict';
    var Color = require('../mixins/Color');

    var Price = React.createClass({
        mixins: [Color],
        getInitialState: function () {
            return {
                style: {}
            };
        },
        render: function () {
            return (
                <span style={this.state.style}>
                    {this.props.price ? this.props.price.toFixed(2) : 'Loading...'}
                </span>
            );
        }
    });

    module.exports = Price;
})();
