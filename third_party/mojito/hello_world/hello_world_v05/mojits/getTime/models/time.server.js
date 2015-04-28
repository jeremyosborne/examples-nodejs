// BEGIN CODE CHANGE.
// Change the module name to match the naming convention of:
// {mojit_name}Model{Model_name}
YUI.add('getTimeModelTime', function(Y, NAME) {
// END CODE CHANGE.

    Y.namespace('mojito.models')[NAME] = {

        // NOTE: Right now, we don't use the config. Just ignore.
        init: function(config) {
            this.config = config;
        },

        // BEGIN CODE CHANGE
        // Rename the function.
        // Models should, in general, be callback based and assume
        // asynchronous flow. Our function, however, is not async.
        get: function(callback) {
            // The first parameter is usually an error object or code,
            // and we are not allowing for an error.
            // Second parameter contains our data model.
            callback(null, { time: new Date() });
        }
        // END CODE CHANGE

    };

}, '0.0.1', {requires: []});
