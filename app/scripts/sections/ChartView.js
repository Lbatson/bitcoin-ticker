(function () {
    'use strict';
    var React = require('react'),
        PriceComponent = require('../ui/PriceComponent');

    var ChartView = React.createClass({
        getInitialState: function () {
            return {
                prices: this.props.price ? [this.props.price] : []
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.price && !nextProps.reset) {
                this.state.prices.push(nextProps.price);
            } else if (nextProps.price) {
                this.state.prices = [nextProps.price];
            }
        },
        render: function () {
            return (
                <div className="row">
                    <div className="col-md-2">Chart placeholder</div>
                </div>
            );
        }
    });

    module.exports = ChartView;
})();
