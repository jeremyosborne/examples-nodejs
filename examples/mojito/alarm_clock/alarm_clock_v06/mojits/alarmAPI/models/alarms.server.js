YUI.add('alarmAPIModelAlarms', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {
        init: function(config) {
            this.config = config;
        },

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
                    cb("ERROR in _readCache", null);
                }
                else {
                    cb(err, parsed);
                }
            }
            fs.readFile(process.cwd() + "/cache.json", fileData);
        },
        
        // BEGIN CODE CHANGES
        // Build a utility function that to write the cache back to disk.
        // Cache is assumed to be the previously read cache, still in the
        // form of a JavaScript object (unserialized).
        // cb is the callback function that will take one argument (err),
        // that will indicate either the write was successful (!err), or the 
        // write failed (err is truthy).
        _writeCache: function(cache, cb) {
            var fs = require('fs');
            fs.writeFile(process.cwd() + "/cache.json", 
                JSON.stringify(cache), 
                // The writeFile method matches our signature, and we can
                // directly call the callback function.
                cb);
        },
        // END CODE CHANGES
                
        get: function(callback) {
            this._readCache(callback);
        },
        
        // BEGIN CODE CHANGES
        // Setting an alarm consists of setting a message (string),
        // setting a time for the alarm (number ms since epoch), and passing 
        // in a callback function to retrieve whether or not there was an 
        // error when saving.
        // If someone saves the same message (which is the alarm key), we
        // don't care. We assume the user wants to overwrite the alarm.
        set: function(message, time, callback) {
            // Needed for the callback.
            var self = this;
            
            // Second part of the process, deal with the cache in memory.
            var getData = function(err, alarmCache) {
                if (err) {
                    // If we have any error, we're done.
                    callback(err, null);
                }
                else {
                    // Write the alarm, and assume time is already a number.
                    alarmCache[message] = time;
                    
                    // Write the updated cache to disk.
                    // We were either successful or not.
                    // No need to check here: err will either be falsey or
                    // truthy, and the callback function can handle it.
                    self._writeCache(alarmCache, callback);
                }
            };
            
            // Some minor due dilligence.
            time = parseInt(time);
            if (isNaN(time)) {
                // Problem, stop before we start.
                callback("ERROR: time must not be NaN.");
            }
            else {
                // Begin the process: read the cache.
                this._readCache(getData);                            
            }
        }
        // END CODE CHANGES

    };

}, '0.0.1', {requires: []});
