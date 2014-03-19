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
        
        set: function(ac) {
            var params = ac.params.getFromUrl();
            var message = params.message;
            var time = params.time;

            ac.models.get("alarmAPIModelAlarms").set(message, time, function(err) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done({
                    success: true
                }, 'json');
            });
        },

        // BEGIN CODE CHANGES
        // The delete API takes a single query string param: the message,
        // which functions as the key of our alarm (one alarm per message).
        // Easiest to copy the contents of the set function and just change
        // to suit our needs.
        del: function(ac) {
            var params = ac.params.getFromUrl();
            // Only look for one param.
            var message = params.message;

            // Correctly call the del function.
            ac.models.get("alarmAPIModelAlarms").del(message, function(err) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done({
                    success: true
                }, 'json');
            });
        }
        // END CODE CHANGES
    };

}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
