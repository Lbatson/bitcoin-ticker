(function () {
    'use strict';
    var React = require('react'),
        CurrencySymbolComponent = require('../ui/CurrencySymbolComponent'),
        PriceComponent = require('../ui/PriceComponent'),
        CurrencySelectionComponent = require('../ui/CurrencySelectionComponent');

    var PriceView = React.createClass({
        render: function () {
            return (
                <div className='row'>
                    <div className='col-md-3'>
                        <h4>
                            Current Price:&nbsp;
                            <CurrencySymbolComponent currency={this.props.currency} />&nbsp;
                            <PriceComponent
                                price={this.props.price}
                                reset={this.props.reset} />
                        </h4>
                    </div>
                    <div className='col-md-2'>
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
