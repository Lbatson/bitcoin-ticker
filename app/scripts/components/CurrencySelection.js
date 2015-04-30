/** @jsx React.DOM */
(function () {
    'use strict';
    var currencyList = require('../data/CurrencySymbolList');

    var CurrencySelection = React.createClass({
        propTypes: {
            onSelection: React.PropTypes.func,
            value: React.PropTypes.string
        },
        _handleSelection: function (e) {
            this.props.onSelection(e.target.value);
        },
        render: function () {
            var options = Object.keys(currencyList).map(function (key, index) {
                return <option key={key} value={key}>{key}</option>;
            });
            return (
                <select className='form-control' value={this.props.value} onChange={this._handleSelection}>{options}</select>
            );
        }
    });

    module.exports = CurrencySelection;
})();
