/** @jsx React.DOM */
(function () {
    'use strict';
    var Color = require('../mixins/Color');

    var ChangeIndicator = React.createClass({
        mixins: [Color],
        getIndicatorState: function (nextProps) {
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
        getInitialState: function () {
            var state = this.getIndicatorState();
            state.price = this.props.price;
            state.style = {};
            return state;
        },
        componentWillReceiveProps: function (nextProps) {
            this.setState(this.getIndicatorState(nextProps));
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
                <i className={classes} style={this.state.style}></i>
            );
        }
    });

    module.exports = ChangeIndicator;
})();
