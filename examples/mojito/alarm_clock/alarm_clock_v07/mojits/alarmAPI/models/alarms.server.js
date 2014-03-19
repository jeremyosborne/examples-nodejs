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
        
        _writeCache: function(cache, cb) {
            var fs = require('fs');
            fs.writeFile(process.cwd() + "/cache.json", 
                JSON.stringify(cache), 
                cb);
        },
                
        get: function(callback) {
            this._readCache(callback);
        },
        
        set: function(message, time, callback) {
            var self = this;
            var getData = function(err, alarmCache) {
                if (err) {
                    callback(err, null);
                }
                else {
                    alarmCache[message] = time;
                    
                    self._writeCache(alarmCache, callback);
                }
            };
            
            time = parseInt(time);
            if (isNaN(time)) {
                callback("ERROR: time must not be NaN.");
            }
            else {
                this._readCache(getData);                            
            }
        },
        
        // BEGIN CODE CHANGES
        // Allow the deletion of an alarm.
        // NOTE: The way our API works, alarms will not be deleted just
        // because they are expired. They must be explicitly deleted.
        // The key to the alarm is the message, and as such the message
        // must be passed in for the deletion to occur.
        // As with all of our other APIs, callback will be required.
        // It will be passed a single value, 
        del: function(message, callback) {
            // The best way to start this example is to cut and paste from
            // the set command, and then make the changes below.

            // For closure reference.
            var self = this;
            var getData = function(err, alarmCache) {
                if (err) {
                    callback(err, null);
                }
                else {
                    // Attempt to delete the alarm from the cache.
                    delete alarmCache[message];

                    // Update the cache on disk.
                    self._writeCache(alarmCache, callback);
                }
            };
            
            // Need to read the data into memory before we can change
            // anything.
            this._readCache(getData);                            
        }
        // END CODE CHANGES

    };

}, '0.0.1', {requires: []});
