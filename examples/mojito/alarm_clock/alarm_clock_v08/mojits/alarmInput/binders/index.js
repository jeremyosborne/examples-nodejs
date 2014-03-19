YUI.add('alarmInputBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        // BEGIN CODE CHANGES
        bind: function(node) {
            
            // Setup our submit event.
            node.one("form").on("submit", function(e) {
                // Our data to send to the server.
                var time = this.one("input[type='number']").get("value");
                var message = this.one("input[type='text']").get("value");
                
                // Just in case.
                e.preventDefault();
                
                // Normalize, and allow floating points.
                time = parseFloat(time);
                if (isNaN(time) || !message) {
                    // fail out
                    console.log("Not sending bad data to server.");
                    return;
                }

                // Turn time into milliseconds in the future, per our
                // API.
                time = parseInt((new Date()).getTime() + (time * 60 * 1000));
                
                // Send the data to the server.
                Y.io("/set", {
                    "data": {
                        "time": time,
                        "message": message
                    },
                    "on": {
                        "success": function() {
                            console.log("Data successfully saved.");
                        },
                        "failure": function() {
                            console.log("Data filed to save.");
                        }
                    }
                });
            });
        }
        // END CODE CHANGES

    };

// BEGIN CODE CHANGES
// Get rid of modules we don't need.
// Add modules we do need.
}, '0.0.1', {requires: ['io', 'querystring-stringify-simple', 'mojito-client']});
/* END CODE CHANGES */
