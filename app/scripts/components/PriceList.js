/** @jsx React.DOM */
(function () {
    'use strict';
    var CurrencySymbol  = require('../components/CurrencySymbol'),
        Price           = require('../components/Price'),
        ChangeIndicator = require('../components/ChangeIndicator');

    var PriceRow = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        render: function () {
            return (
                <li className="list-group-item">
                    <CurrencySymbol currency={this.props.currency} />&nbsp;
                    <Price
                        price={this.props.price}
                        reset={this.props.reset} />
                    <ChangeIndicator
                        price={this.props.price}
                        reset={this.props.reset} />
                </li>
            );
        }
    });

    var PriceList = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            max: React.PropTypes.number,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                max: 5
            };
        },
        getInitialState: function () {
            return {
                prices: this.props.price ? [this.props.price] : []
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.price && !nextProps.reset) {
                this.state.prices.push(nextProps.price);
                if (this.state.prices.length > this.props.max) {
                    this.state.prices.splice(0, 1);
                }
            } else if (nextProps.price) {
                this.state.currency = nextProps.currency;
                this.state.prices = [nextProps.price];
            }
        },
        render: function () {
            var prices = this.state.prices.map(function (price) {
                return <PriceRow
                            currency={this.props.currency}
                            price={price}
                            reset={this.props.reset} />;
            }.bind(this));
            prices.reverse();
            return (
                <ul className="list-group">{prices}</ul>
            );
        }
    });

    module.exports = PriceList;
})();
