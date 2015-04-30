(function () {
    'use strict';
    var Chart = require('../components/Chart');

    var ChartPanel = React.createClass({
        propTypes: {
            currency: React.PropTypes.string,
            price: React.PropTypes.number,
            reset: React.PropTypes.bool,
        },
        render: function () {
            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Chart</h3>
                    </div>
                    <div className='panel-body'>
                        <Chart {...this.props} />
                    </div>
                </div>
            );
        }
    });

    module.exports = ChartPanel;
})();
