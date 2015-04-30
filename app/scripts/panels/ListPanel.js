(function () {
    'use strict';
    var PriceList = require('../components/PriceList');

    var ListPanel = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        render: function () {
            return (
                <div className='panel panel-default price-list-container'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>List</h3>
                    </div>
                    <div className='panel-body'>
                        <PriceList {...this.props} />
                    </div>
                </div>
            );
        }
    });

    module.exports = ListPanel;
})();
