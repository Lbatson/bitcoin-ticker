/** @jsx React.DOM */
(function () {
    'use strict';
    var Color = require('../mixins/Color');

    var ChangeIndicator = React.createClass({
        propTypes: {
            price: React.PropTypes.number,
            reset: React.PropTypes.bool
        },
        mixins: [Color],
        getInitialState: function () {
            return this._getIndicatorState();
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState(this._getIndicatorState(nextProps));
        },
        _getIndicatorState: function (nextProps) {
            var state = {
                unchanged: true,
                increased: false,
                decreased: false
            };
            if (this.props.price !== null && nextProps && !nextProps.reset) {
                if (nextProps.price > this.props.price) {
                    state.unchanged = false;
                    state.decreased = false;
                    state.increased = true;
                } else if (nextProps.price < this.props.price) {
                    state.unchanged = false;
                    state.increased = false;
                    state.decreased = true;
                }
            }
            return state;
        },
        render: function () {
            var classes = React.addons.classSet({
                'pull-right': true,
                'fa': true,
                'fa-lg': true,
                'fa-minus': this.state.unchanged,
                'fa-arrow-up': this.state.increased,
                'fa-arrow-down': this.state.decreased
            })
            return (
                <i className={classes} style={this.state.colorMixin}></i>
            );
        }
    });

    module.exports = ChangeIndicator;
})();
