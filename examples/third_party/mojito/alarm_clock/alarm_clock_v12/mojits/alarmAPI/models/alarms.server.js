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
        
        del: function(message, callback) {
            var self = this;
            var getData = function(err, alarmCache) {
                if (err) {
                    callback(err, null);
                }
                else {
                    delete alarmCache[message];

                    self._writeCache(alarmCache, callback);
                }
            };
            
            this._readCache(getData);                            
        }

    };

}, '0.0.1', {requires: []});
