'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INFO = require('../../constants').INFO;

var FeedBack = function (_React$Component) {
  _inherits(FeedBack, _React$Component);

  function FeedBack() {
    _classCallCheck(this, FeedBack);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FeedBack).apply(this, arguments));
  }

  _createClass(FeedBack, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var statusCode = _props.statusCode;
      var message = _props.message;

      var classes = '';

      if (statusCode === INFO) {
        classes = 'alert alert-info alert-dismissable';
      } else if (statusCode === _constants.SUCCESS) {
        classes = 'alert alert-success alert-dismissable';
      } else if (statusCode === _constants.ERROR) {
        classes = 'alert alert-danger alert-dismissable';
      }

      return _react2.default.createElement(
        'div',
        { className: classes },
        message
      );
    }
  }]);

  return FeedBack;
}(_react2.default.Component);

FeedBack.propTypes = {
  message: _react.PropTypes.string,
  statusCode: _react.PropTypes.oneOf([INFO, _constants.SUCCESS, _constants.ERROR])
};
exports.default = FeedBack;