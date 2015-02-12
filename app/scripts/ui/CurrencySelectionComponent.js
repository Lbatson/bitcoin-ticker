/** @jsx React.DOM */
(function () {
    'use strict';
    var React = require('react'),
        currencyList = require('../data/CurrencySymbolList');

    var CurrencySelectionComponent = React.createClass({
        handleSelection: function (e) {
            this.props.callback(e.target.value);
        },
        render: function () {
            var options = Object.keys(currencyList).map(function (key, index) {
                return <option key={key} value={key}>{key}</option>;
            });
            return (
                <select value={this.props.value} onChange={this.handleSelection}>{options}</select>
            );
        }
    });

    module.exports = CurrencySelectionComponent;
})();
