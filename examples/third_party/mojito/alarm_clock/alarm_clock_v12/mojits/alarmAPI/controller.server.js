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

        del: function(ac) {
            var params = ac.params.getFromUrl();
            var message = params.message;

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
    };

}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
