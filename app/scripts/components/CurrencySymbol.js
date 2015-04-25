/** @jsx React.DOM */
(function () {
    'use strict';
    var React        = require('react'),
        currencyList = require('../data/CurrencySymbolList');

    var CurrencySymbol = React.createClass({
        render: function () {
            return (
                <span>{currencyList[this.props.currency]}</span>
            );
        }
    });

    module.exports = CurrencySymbol;
})();
