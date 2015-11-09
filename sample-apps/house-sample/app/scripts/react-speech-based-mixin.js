var voiceCommandDispatcher = require('../../bower_components/voice-command-dispatcher/src/voice-command-dispatcher');
var witService = require('../../bower_components/voice-command-dispatcher/src/modules/service-layer/wit-xhr-service-layer');
var VCD = new voiceCommandDispatcher(witService);
VCD.start();
/**
 * Adds or removes the component from the intent registry
 * @param  {String} method To register or unregister the component
 */
function _toggleComponentListening(method) {
  var intent;
  var actionName;
  for (intent in this.intentActionMap) {
    actionName = this.intentActionMap[intent];
    VCD[method](intent, this[actionName]);
  }
}

var ReactSpeechBasedMixin = {

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
    componentWillMount: function() {
      _toggleComponentListening.call(this, 'register');
    },

    /**
     * At the moment of destroying, we remove the listeners for each defined intent
     */
    componentWillUnmount: function() {
      _toggleComponentListening.call(this, 'unregister');
    }
};

module.exports = ReactSpeechBasedMixin;
