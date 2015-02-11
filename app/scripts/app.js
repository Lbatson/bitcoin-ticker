/** @jsx React.DOM */
(function () {
    'use strict';
    var React = window.React = require('react'),
        Moment = require('moment'),
        CurrencySymbolComponent = require('./ui/CurrencySymbolComponent'),
        PriceComponent = require('./ui/PriceComponent'),
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
                price: null
            };
        },
        loadPrice: function () {
            $.ajax({
                url: 'https://api.bitcoinaverage.com/ticker/' + this.props.currency + '/last',
                dataType: 'json',
                success: function (data) {
                    this.setState({
                        currency: this.props.currency,
                        price: data
                    });
                }.bind(this),
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                currency: nextProps.currency
            });
        },
        componentDidMount: function () {
            this.loadPrice();
            this.updateInterval = setInterval(this.loadPrice, this.props.updateInterval);
        },
        componentWillUnmount: function () {
            clearInterval(this.updateInterval);
        },
        render: function () {
            return (
                <div>
                    <h3>Bitcoin Ticker</h3>
                    <h5>{this.state.datetime}</h5>
                    <div>
                        Current Price:&nbsp;
                        <CurrencySymbolComponent currency={this.state.currency} />&nbsp;
                        <PriceComponent price={this.state.price} />&nbsp;
                    </div>
                </div>
            );
        }
    });

    React.render(<BitcoinTicker updateInterval={10000} currency='USD' />, mountNode);
})();
