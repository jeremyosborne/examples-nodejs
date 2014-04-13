YUI.add('compositeModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback) {
            callback(null, { name: 'hello world', age: 'fossil' });
        }

    };

}, '0.0.1', {requires: []});
