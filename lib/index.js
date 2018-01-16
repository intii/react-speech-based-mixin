'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoiceCommandDispatcher = require('voice-command-dispatcher/src/voice-command-dispatcher');

/**
 * Adds or removes the component from the intent registry
 * @param  {String} method To register or unregister the component
 */
function _toggleComponentListening(method) {
  var intent;
  var action;
  for (intent in this.props.intentActionMap) {
    action = this.props.intentActionMap[intent];
    window.VCD[method](intent, action);
  }
}

var BaseSpeechComponent = function (_Component) {
  _inherits(BaseSpeechComponent, _Component);

  function BaseSpeechComponent(props) {
    _classCallCheck(this, BaseSpeechComponent);

    // Singleton voice command dispatcher
    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    if (!window.VCD) {
      window.VCD = new VoiceCommandDispatcher(props.serviceName, props.config);
      window.VCD.start();
    }
    return _this;
  }

  /**
   * This is a map between a type of intent, and the corresponding action associated
   * to it. Each extended component should overwrite this mapping.
   * @type {Object}
   */
  // intentActionMap: {},

  /**
   * At the moment of the creation of the component, we register make the component listen for
   * each defined intent
   */


  BaseSpeechComponent.prototype.componentWillMount = function componentWillMount() {
    _toggleComponentListening.call(this, 'register');
  };

  /**
   * At the moment of destroying, we remove the listeners for each defined intent
   */


  BaseSpeechComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    _toggleComponentListening.call(this, 'unregister');
  };

  BaseSpeechComponent.prototype.render = function render() {
    // const { children } = this.props;
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  };

  return BaseSpeechComponent;
}(_react.Component);

exports.default = BaseSpeechComponent;
module.exports = exports['default'];