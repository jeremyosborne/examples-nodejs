YUI.add('getTime', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            ac.models.get("getTimeModelFoo").getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        },
        
        serverTime: function(ac) {
            ac.models.get("getTimeModelTime").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                
                // BEGIN CODE CHANGE
                // Add our CSS.
                ac.assets.addCss('./serverTime.css');
                // END CODE CHANGE
                ac.done(data);
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'getTimeModelFoo', 'mojito-intl-addon']});
