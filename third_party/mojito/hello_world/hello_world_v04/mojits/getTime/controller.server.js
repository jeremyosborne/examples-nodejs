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
            // BEGIN CHANGED CODE
            // REMOVE THE OLD ac.done method...
            //ac.done('Hello, world. The server time is: ' + (new Date()) + '.');
            //...and replace with:
            // pass a context object to the view and let the template do the
            // work.
            ac.done({
                time: new Date()
            });
            // END CHANGED CODE
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'getTimeModelFoo']});
