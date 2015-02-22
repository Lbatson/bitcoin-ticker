/** @jsx React.DOM */
(function () {
    'use strict';
    var React     = window.React = require('react'),
        moment    = require('moment'),
        PriceView = require('./sections/PriceView'),
        ChartView = require('./sections/ChartView'),
        mountNode = document.getElementById('app');

    var BitcoinTicker = React.createClass({
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
        loadPrice: function (currency) {
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
        componentDidMount: function () {
            this.loadPrice(this.props.currency);
            this.updateInterval = setInterval(this.loadPrice, this.props.interval);
        },
        componentWillUnmount: function () {
            clearInterval(this.updateInterval);
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
                            <div className='panel panel-default'>
                                <div className='panel-heading'>
                                    <h3 className='panel-title'>Price</h3>
                                </div>
                                <div className='panel-body'>
                                    <PriceView
                                        currency={this.state.currency || this.props.currency}
                                        price={this.state.price}
                                        reset={this.state.reset}
                                        onSelection={this.loadPrice} />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading'>
                                    <h3 className='panel-title'>Chart</h3>
                                </div>
                                <div className='panel-body'>
                                    <ChartView
                                        currency={this.state.currency || this.props.currency}
                                        price={this.state.price}
                                        reset={this.state.reset} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    React.render(<BitcoinTicker interval={5000} currency='USD' />, mountNode);
})();
