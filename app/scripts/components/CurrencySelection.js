/** @jsx React.DOM */
(function () {
    'use strict';
    var React        = require('react'),
        currencyList = require('../data/CurrencySymbolList');

    var CurrencySelection = React.createClass({
        handleSelection: function (e) {
            this.props.onSelection(e.target.value);
        },
        render: function () {
            var options = Object.keys(currencyList).map(function (key, index) {
                return <option key={key} value={key}>{key}</option>;
            });
            return (
                <select className='form-control' value={this.props.value} onChange={this.handleSelection}>{options}</select>
            );
        }
    });

    module.exports = CurrencySelection;
})();
