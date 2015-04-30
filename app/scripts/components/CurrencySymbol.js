/** @jsx React.DOM */
(function () {
    'use strict';
    var currencyList = require('../data/CurrencySymbolList');

    var CurrencySymbol = React.createClass({
        propTypes: {
            currency: React.PropTypes.string
        },
        render: function () {
            return (
                <span>{currencyList[this.props.currency]}</span>
            );
        }
    });

    module.exports = CurrencySymbol;
})();
