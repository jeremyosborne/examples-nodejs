YUI.add('alarmDisplayBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        _alarms: {},
        
        container: null,

        _secondsInFuture: function(time) {
            var msInFuture = time - (new Date()).getTime();
            var secInFuture;
            if (msInFuture > 0) {
                secInFuture = msInFuture / 1000;
                secInFuture = parseInt(secInFuture % 60, 10);
                return (secInFuture > 9) ? secInFuture : "0" + secInFuture;
            }
            return "00";
        },

        _minutesInFuture: function(time) {
            var msInFuture = time - (new Date()).getTime();
            
            if (msInFuture > 0) {
                return parseInt(msInFuture / 60000, 10);
            }
            else {
                return 0;
            }
        },

        _drawAlarm: function(message, time) {
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
                    this._drawAlarm(message, alarms[message]);
                }
            }
        },
        
        _refreshAlarmView: function() {
            var self = this;
            
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
                        self._alarms = alarms;
                        self._drawAlarms();
                    },
                    "error": function() {
                        console.log("Problem in the alarmDisplay _refreshAlarmView");
                    }
                }
            })
        },
        
        // BEGIN CODE CHANGE
        // Cycle through any of the alarms on the page and update their
        // count down.
        _updateAlarms: function() {
            var self = this;
            
            this.container.all(".alarm-clock").each(function(alarm) {
                // Recalculate the remaining time.
                var time = parseInt(alarm.getData("ms-since-epoch"), 10);
                
                var minutes = self._minutesInFuture(time);
                var seconds = self._secondsInFuture(time);
                
                alarm.one(".minutes").setHTML(minutes);
                alarm.one(".seconds").setHTML(seconds);
            });
        },
        // END CODE CHANGE
        
        bind: function(node) {
            var self = this;
            
            this.container = node;
            
            this._refreshAlarmView();
            
            // BEGIN CODE CHANGE
            // Kick off the countdown timer.
            setInterval(function() {
                self._updateAlarms();
            }, 1000);
            // END CODE CHANGE
        }

    };

}, '0.0.1', {requires: ['node', 'substitute', 'io', 'json', 'mojito-client']});
