YUI.add('getTimeModelTime', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        get: function(callback) {
            callback(null, { time: new Date() });
        }

    };

}, '0.0.1', {requires: []});
