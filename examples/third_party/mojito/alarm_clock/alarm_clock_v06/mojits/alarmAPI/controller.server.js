YUI.add('alarmAPI', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        get: function(ac) {
            ac.models.get("alarmAPIModelAlarms").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done({
                    alarms: data
                }, 'json');
            });
        },
        
        // BEGIN CODE CHANGES
        // Our set function accepts the following query string params.
        // time -> number of milliseconds since the epoch.
        // message -> the message associated with an alarm.
        set: function(ac) {
            // Get the query string parameters.
            var params = ac.params.getFromUrl();
            var message = params.message;
            var time = params.time;

            // The set method is boolean. It either works, or it doesn't.
            ac.models.get("alarmAPIModelAlarms").set(message, time, function(err) {
                if (err) {
                    ac.error(err);
                    return;
                }
                // if we're here, we have a success.
                // We could have also written this api to return false
                // to the client vs. just exploding.
                ac.done({
                    success: true
                }, 'json');
            });
        },
        // END CODE CHANGES

        del: function(ac) {
            ac.done({
                "message": "del called."
            }, "json");
        }
    };

// ADDITIONAL CODE
// Need to add the mojito-params-addon
}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
