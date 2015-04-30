/** @jsx React.DOM */
(function () {
    'use strict';
    var Color = require('../mixins/Color');

    var Price = React.createClass({
        propTypes: {
            price: React.PropTypes.number,
        },
        mixins: [Color],
        render: function () {
            return (
                <span style={this.state.colorMixin}>
                    {this.props.price ? this.props.price.toFixed(2) : 'Loading...'}
                </span>
            );
        }
    });

    module.exports = Price;
})();
