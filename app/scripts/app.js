/** @jsx React.DOM */
(function () {
    'use strict';
    var React = window.React = require('react'),
        Moment = require('moment'),
        PriceView = require('./sections/PriceView'),
        ChartView = require('./sections/ChartView'),
        mountNode = document.getElementById('app');

    var BitcoinTicker = React.createClass({
        propTypes: {
            updateInterval: React.PropTypes.number,
            currency: React.PropTypes.string
        },
        getDefaultProps: function () {
            return {
                updateInterval: 10000,
                currency: 'USD'
            };
        },
        getInitialState: function () {
            return {
                datetime: new Moment().format('MM/D/YYYY'),
                price: null,
                reset: true
            };
        },
        loadPrice: function (currency) {
            $.ajax({
                url: 'https://api.bitcoinaverage.com/ticker/' + (currency || this.state.currency) + '/last',
                dataType: 'json'
            })
            .done(function (data) {
                this.setState({
                    currency: currency || this.state.currency,
                    price: data,
                    reset: !!currency || false
                });
            }.bind(this))
            .fail(function (jqXHR, status, err) {
                console.log(status, err);
            });
        },
        componentDidMount: function () {
            this.loadPrice(this.props.currency);
            this.updateInterval = setInterval(this.loadPrice, this.props.updateInterval);
        },
        componentWillUnmount: function () {
            clearInterval(this.updateInterval);
        },
        render: function () {
            return (
                <div>
                    <h3> Bitcoin Ticker</h3>
                    <h5>{this.state.datetime}</h5>
                    <PriceView
                        currency={this.state.currency}
                        price={this.state.price}
                        reset={this.state.reset}
                        onSelection={this.loadPrice} />
                    <ChartView
                        price={this.state.price}
                        reset={this.state.reset} />
                </div>
            );
        }
    });

    React.render(<BitcoinTicker updateInterval={10000} currency='USD' />, mountNode);
})();
