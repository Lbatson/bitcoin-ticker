(function () {
    'use strict';
    var React             = require('react'),
        CurrencySymbol    = require('../components/CurrencySymbol'),
        Price             = require('../components/Price'),
        CurrencySelection = require('../components/CurrencySelection');

    var PriceSection = React.createClass({
        render: function () {
            return (
                <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='margin-top-5'>
                            <CurrencySymbol currency={this.props.currency} />&nbsp;
                            <Price
                                price={this.props.price}
                                reset={this.props.reset} />
                        </h3>
                    </div>
                    <div className='col-md-6'>
                        <CurrencySelection
                            value={this.props.currency}
                            onSelection={this.props.onSelection} />
                    </div>
                </div>
            );
        }
    });

    module.exports = PriceSection;
})();
