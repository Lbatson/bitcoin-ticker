(function () {
    'use strict';
    var CurrencySymbol    = require('../components/CurrencySymbol'),
        Price             = require('../components/Price'),
        CurrencySelection = require('../components/CurrencySelection');

    var PricePanel = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            onSelection: React.PropTypes.func,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        render: function () {
            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Price</h3>
                    </div>
                    <div className='panel-body'>
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
                    </div>
                </div>
            );
        }
    });

    module.exports = PricePanel;
})();
