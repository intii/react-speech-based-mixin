var voiceCommandDispatcher = require('./vendor/voice-command-dispatcher/dist/vcd.js');
var ReactSpeechBasedMixin = {
    listenForIntent: function(intent) {
        //Listens for the specific intent from the WitDispatcher.
        // WitDispatcher.subscribe(intent, this.processIntent);
        this.processIntent();
    },

    processIntent: function(data) {
        //Process the intent, this method has to be redefined by the component
    },

    componentWillMount: function() {
        console.log('MIXIN');
    }
};

module.exports = ReactSpeechBasedMixin;
