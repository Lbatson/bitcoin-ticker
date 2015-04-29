(function () {
    'use strict';
    var Color = {
        componentWillReceiveProps: function (nextProps) {
            var color = '#333333';
            if (this.props.price !== null && nextProps && !nextProps.reset) {
                if (nextProps.price > this.props.price) {
                    color = '#3c763d';
                } else if (nextProps.price < this.props.price) {
                    color = '#a94442';
                }
            }
            this.setState({
                style: {
                    color: color
                }
            });
        }
    };

    module.exports = Color;
})();
