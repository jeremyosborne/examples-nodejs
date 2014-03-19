YUI.add('alarmDisplayBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        // BEGIN CODE CHANGES
        // Our current set of alarms, saved from the server.
        _alarms: {},
        
        // We will save a reference to our container.
        container: null,

        // How many remainder of seconds in the future until this alarm
        // goes off. Value will be between 0 and 60, use the _minutesInFuture
        // to return how many minutes are remaining on our alarm.
        // Expects milliseconds since the epoch.
        // Returns text value, which is zero filled.        
        _secondsInFuture: function(time) {
            var msInFuture = time - (new Date()).getTime();
            var secInFuture;
            if (msInFuture > 0) {
                secInFuture = msInFuture / 1000;
                secInFuture = parseInt(msInFuture % 60, 10);
                return (secInFuture > 9) ? secInFuture : "0" + secInFuture;
            }
            // Must be in the past, return zero filled zero.
            return "00";
        },

        // How many minutes in the future until this alarm goes off
        // (excluding remainder of seconds).
        // Expects milliseconds since the epoch.
        // Returns number value, not zero filled.
        _minutesInFuture: function(time) {
            var msInFuture = time - (new Date()).getTime();
            if (msInFuture > 0) {
                // No remainder
                return parseInt(msInFuture / 60000, 10);
            }
            else {
                return 0;
            }
        },

        // Draw a singular alarm and set up any necessary timers around
        // the alarm.
        // We take the message to display and the time to display the
        // message (time here is number of ms since th epoch);
        _drawAlarm: function(message, time) {
            // Get the template string for each alarm from our view.
            var template = this.container.one(".alarm-template").getHTML();
            
            Y.Node.create(Y.substitute(template, {
                "msSinceEpoch": time,
                "message": message,
                "minutes": this._minutesInFuture(time),
                "seconds": this._secondsInFuture(time)
            })).appendTo(this.container);
        },
        
        // Draw, or update, any alarms in the hash.
        _drawAlarms: function() {
            var message;
            var alarms = this._alarms;
            
            for (message in alarms) {
                if (alarms.hasOwnProperty(message)) {
                    // Setup a singular alarm.
                    // alarms[message] is the time since epoch.
                    this._drawAlarm(message, alarms[message]);
                }
            }
        },
        
        // Utility that will get any alarm on the server and attempt to draw 
        // it on screen.
        _refreshAlarmView: function() {
            // Closure reference.
            var self = this;
            
            // Remove any alarm nodes from the page.
            this.container.all(".alarm-clock").remove();
            
            Y.io("/get", {
                "on": {
                    "success": function(id, xhr) {
                        var alarms;
                        try {
                            alarms = Y.JSON.parse(xhr.responseText).alarms;
                        }
                        catch(e) {
                            console.log("Problem parsing alarms: " + e);
                            return;
                        }
                        // Save the current hash of alarms.
                        self._alarms = alarms;
                        // Draw the alarms if we make it here.
                        self._drawAlarms();
                    },
                    "error": function() {
                        // Just console.log out the error.
                        console.log("Problem in the alarmDisplay _refreshAlarmView");
                    }
                }
            })
        },
        
        // Setup the initial view.
        bind: function(node) {
            // Need this in our other functions.
            this.container = node;
            
            // Draw all of the alarms that are stored on the server.
            this._refreshAlarmView();
        }
        // END CODE CHANGES

    };

// BEGIN CODE CHANGES
// Remove unnecessary modules.
// Add required modules.
}, '0.0.1', {requires: ['node', 'substitute', 'io', 'json', 'mojito-client']});
/* END CODE CHANGES */
