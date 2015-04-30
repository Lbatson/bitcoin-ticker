(function () {
    'use strict';
    var moment       = require('moment'),
        c3           = require('c3'),
        currencyList = require('../data/CurrencySymbolList');

    var Chart = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            max: React.PropTypes.number,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                max: 20
            };
        },
        getInitialState: function () {
            return {
                prices: this.props.price ? ['Price', this.props.price] : ['Price']
            };
        },
        componentDidMount: function () {
            this._generateChart();
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.price && !nextProps.reset) {
                this.state.prices.push(nextProps.price);
                if (this.state.prices.length > this.props.max + 1) {
                    this.state.prices.splice(1, 1);
                }
                this.chart.load({
                    columns: [this.state.prices]
                });
            } else if (nextProps.price) {
                this.state.currency = nextProps.currency;
                this.state.prices = ['Price', nextProps.price];
                this._generateChart();
            }
        },
        _generateChart: function () {
            var currency = currencyList[this.state.currency];
            this.chart = c3.generate({
                data: {
                    columns: [this.state.prices]
                },
                tooltip: {
                    format: {
                        value: function (value, ratio, id) {
                            return currency + ' ' + value.toFixed(2);
                        }
                    }
                }
            });
        },
        render: function () {
            return (
                <div id='chart'></div>
            );
        }
    });

    module.exports = Chart;
})();
