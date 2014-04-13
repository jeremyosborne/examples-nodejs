YUI.add('alarmAPI', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        get: function(ac) {
            // BEGIN CODE CHANGES
            // Easier to wipe everything that was here previously and retype.
            ac.models.get("alarmAPIModelAlarms").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                // Send back our JSON data cache of alarms.
                ac.done({
                    alarms: data
                }, 'json');
            });
            // CODE CHANGES
        },
        
        set: function(ac) {
            ac.done({
                "message": "set called."
            }, "json");
        },

        del: function(ac) {
            ac.done({
                "message": "del called."
            }, "json");
        }
    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
