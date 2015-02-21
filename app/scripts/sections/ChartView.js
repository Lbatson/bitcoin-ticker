(function () {
    'use strict';
    var React = require('react'),
        c3 = require('c3');

    var ChartView = React.createClass({
        chart: null,
        getInitialState: function () {
            return {
                prices: this.props.price ? ['Price', this.props.price] : ['Price']
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.price && !nextProps.reset) {
                this.state.prices.push(nextProps.price);
            } else if (nextProps.price) {
                this.state.prices = ['Price', nextProps.price];
            }
            if (this.state.prices.length > 12) {
                this.state.prices.splice(1, 1);
            }
            this.chart.load({
                columns: [this.state.prices]
            });
        },
        componentDidMount: function () {
            this.chart = c3.generate({
                data: {
                    columns: [this.state.prices]
                }
            });
        },
        render: function () {
            return (
                <div></div>
            );
        }
    });

    module.exports = ChartView;
})();
