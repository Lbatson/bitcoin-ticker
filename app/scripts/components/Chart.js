(function () {
    'use strict';
    var React        = require('react'),
        moment       = require('moment'),
        c3           = require('c3'),
        currencyList = require('../data/CurrencySymbolList');

    var Chart = React.createClass({
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
        generateChart: function () {
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
                this.generateChart();
            }
        },
        componentDidMount: function () {
            this.generateChart();
        },
        render: function () {
            return (
                <div id='chart'></div>
            );
        }
    });

    module.exports = Chart;
})();
