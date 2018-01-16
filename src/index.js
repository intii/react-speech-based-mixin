import React, { Component } from 'react';
const VoiceCommandDispatcher = require('voice-command-dispatcher/src/voice-command-dispatcher');

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

class BaseSpeechComponent extends Component {

  constructor(props) {
    super(props);
    // Singleton voice command dispatcher
    if (!window.VCD) {
      window.VCD = new VoiceCommandDispatcher(props.serviceName, props.config);
      window.VCD.start();
    }
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
  componentWillMount() {
    _toggleComponentListening.call(this, 'register');
  }

  /**
   * At the moment of destroying, we remove the listeners for each defined intent
   */
  componentWillUnmount() {
    _toggleComponentListening.call(this, 'unregister');
  }

  render() {
    // const { children } = this.props;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default BaseSpeechComponent;
