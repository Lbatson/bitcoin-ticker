(function () {
    'use strict';
    var React                      = require('react'),
        CurrencySymbolComponent    = require('../ui/CurrencySymbolComponent'),
        PriceComponent             = require('../ui/PriceComponent'),
        CurrencySelectionComponent = require('../ui/CurrencySelectionComponent');

    var PriceView = React.createClass({
        render: function () {
            return (
                <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='margin-top-5'>
                            <CurrencySymbolComponent currency={this.props.currency} />&nbsp;
                            <PriceComponent
                                price={this.props.price}
                                reset={this.props.reset} />
                        </h3>
                    </div>
                    <div className='col-md-6'>
                        <CurrencySelectionComponent
                            value={this.props.currency}
                            onSelection={this.props.onSelection} />
                    </div>
                </div>
            );
        }
    });

    module.exports = PriceView;
})();
