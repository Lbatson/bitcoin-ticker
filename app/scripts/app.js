/** @jsx React.DOM */
(function () {
    'use strict';
    var React      = window.React = require('react/addons'),
        moment     = require('moment'),
        PricePanel = require('./panels/PricePanel'),
        ListPanel  = require('./panels/ListPanel'),
        ChartPanel = require('./panels/ChartPanel'),
        mountNode  = document.getElementById('app');

    var BitcoinTicker = React.createClass({
        propTypes: {
            interval: React.PropTypes.number,
            currency: React.PropTypes.string
        },
        getDefaultProps: function () {
            return {
                interval: 10000,
                currency: 'USD'
            };
        },
        getInitialState: function () {
            return {
                datetime: moment().format('MMMM Do YYYY'),
                reset: true
            };
        },
        componentDidMount: function () {
            this._loadPrice(this.props.currency);
            this.updateInterval = setInterval(this._loadPrice, this.props.interval);
        },
        componentWillUnmount: function () {
            clearInterval(this.updateInterval);
        },
        _loadPrice: function (currency) {
            $.ajax({
                url: 'https://api.bitcoinaverage.com/ticker/' + (currency || this.state.currency) + '/last',
                dataType: 'json'
            })
            .done(function (data) {
                if (this.isMounted()) {
                    this.setState({
                        currency: currency || this.state.currency,
                        price: data,
                        reset: !!currency || false
                    });
                }
            }.bind(this))
            .fail(function (jqXHR, status, err) {
                console.log(status, err);
            });
        },
        render: function () {
            return (
                <div>
                    <div className='row'>
                        <div className='text-center'>
                            <h4>{this.state.datetime}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <PricePanel {...this.state} onSelection={this._loadPrice} />
                            <ListPanel {...this.state} />
                        </div>
                        <div className='col-md-6'>
                            <ChartPanel {...this.state} />
                        </div>
                    </div>
                </div>
            );
        }
    });

    React.render(<BitcoinTicker interval={5000} currency='USD' />, mountNode);
})();
