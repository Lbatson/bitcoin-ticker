/** @jsx React.DOM */
(function () {
    'use strict';
    var React = window.React = require('react'),
        Moment = require('moment'),
        CurrencySymbolComponent = require('./ui/CurrencySymbolComponent'),
        PriceComponent = require('./ui/PriceComponent'),
        CurrencySelectionComponent = require('./ui/CurrencySelectionComponent'),
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
        loadPrice: function (currency) {
            $.ajax({
                url: 'https://api.bitcoinaverage.com/ticker/' + (currency || this.state.currency) + '/last',
                dataType: 'json'
            })
            .done(function (data) {
                this.setState({price: data});
            }.bind(this))
            .fail(function (jqXHR, status, err) {
                console.log(status, err);
            });
        },
        refreshPriceWithCurrency: function (val) {
            this.setState({currency: val});
            this.loadPrice(val);
        },
        componentDidMount: function () {
            this.refreshPriceWithCurrency(this.props.currency);
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
                        <PriceComponent price={this.state.price} />
                        <br/>
                        <CurrencySelectionComponent value={this.state.currency} callback={this.refreshPriceWithCurrency}/>
                    </div>
                </div>
            );
        }
    });

    React.render(<BitcoinTicker updateInterval={10000} currency='USD' />, mountNode);
})();
