YUI.add('recentNews', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {

            // BEGIN CODE CHANGES
            // Our first step is to test our code.
            ac.models.get("recentNewsModelArticles").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }

                // console.log is the equivalent of stdout on the server side
                // in nodejs.
                // We will use this to check and make sure our model is
                // retrieving data from the YQL proxy.
                console.log(data);
                ac.assets.addCss('./index.css');
                ac.done("Testing our model.");
            });
            // END CODE CHANGES
            
            ac.models.get("recentNewsModelFoo").getData(function(err, data) {
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
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'recentNewsModelFoo']});
