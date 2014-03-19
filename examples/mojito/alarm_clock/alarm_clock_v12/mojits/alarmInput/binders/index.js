YUI.add('alarmInputBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            node.one("form").on("submit", function(e) {
                var time = this.one("input[type='number']").get("value");
                var message = this.one("input[type='text']").get("value");
                
                e.preventDefault();
                
                time = parseFloat(time);
                if (isNaN(time) || !message) {
                    console.log("Not sending bad data to server.");
                    return;
                }

                time = parseInt((new Date()).getTime() + (time * 60 * 1000));
                
                Y.io("/set", {
                    "data": {
                        "time": time,
                        "message": message
                    },
                    "on": {
                        "success": function() {
                            console.log("Data successfully saved.");
                            
                            // BEGIN CODE CHANGE
                            // Publish an update event.
                            Y.fire("alarm:new");
                            // END CODE CHANGE
                        },
                        "failure": function() {
                            console.log("Data filed to save.");
                        }
                    }
                });
            });
        }
    };

}, '0.0.1', {requires: ['io', 'querystring-stringify-simple', 'mojito-client']});
