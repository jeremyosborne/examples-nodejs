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
        
        // BEGIN CODE CHANGE
        serverTime: function(ac) {
            // Models are passed to our function attached to the action
            // context models hash.
            ac.models.get("getTimeModelTime").get(function(err, data) {
                // Our model will never return an error, but if it did....
                if (err) {
                    ac.error(err);
                    return;
                }
                // We pass our data directly to our template.
                ac.done(data);
            });
        }
        // END CODE CHANGE

    };

// Additional Code change:
// It appears that while we do need the "mojito-models-addon", despite what
// the docs say, we still don't need to explicitly require our model. But
// we should anyway, just for good measure.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'getTimeModelTime', 'getTimeModelFoo']});
