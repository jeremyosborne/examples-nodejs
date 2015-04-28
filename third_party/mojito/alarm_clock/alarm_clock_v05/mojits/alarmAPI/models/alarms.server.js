YUI.add('alarmAPIModelAlarms', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {
        init: function(config) {
            this.config = config;
        },

        // BEGIN CODE CHANGES
        // Build our utility _readCache function.
        _readCache: function(cb) {
            var fs = require('fs');
            var fileData = function(err, data) {
                var parsed;
                
                try {
                    parsed = JSON.parse(data);
                } catch(e) {
                    // deal with below.
                }
                
                if (err || !parsed) {
                    console.log("ERROR: Problem parsing data in _readCache: " + data);
                    console.log("ERROR: value of data:");
                    console.log(data);
                    console.log("ERROR: value of err:");
                    console.log(err);
                    // UI error is a simple string.
                    cb("ERROR in _readCache", null);
                }
                else {
                    // No error, pass back data.
                    cb(err, parsed);
                }
            }
            // This is asynchronous.
            fs.readFile(process.cwd() + "/cache.json", fileData);
        },
                
        // Build our get function.
        // Alarms are going to be very simple in our data model.
        // They are going to consist of a key that is the alarm message,
        // and a value that is the JavaScript time (number, ms since epoch)
        // of when the alarm should go off.
        get: function(callback) {
            // We're just returning all of the cached alarms.
            this._readCache(callback);
        }
        // END CODE CHANGES

    };

}, '0.0.1', {requires: []});
