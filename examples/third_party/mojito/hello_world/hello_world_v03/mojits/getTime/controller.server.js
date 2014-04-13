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
        // BEGIN NEW CODE
        /**
         * New method mapped to the "serverTime" action of this mojit,
         * which is really just the path that this mojit will respond to.
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        serverTime: function(ac) {
            // Write directly to the response.
            ac.done('Hello, world. The server time is: ' + (new Date()) + '.');
        }
        // END NEW CODE

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'getTimeModelFoo']});
