YUI.add('recentNews', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {

            ac.models.get("recentNewsModelArticles").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }

                // BEGIN CODE CHANGES.
                // We can turn off the debugging now.
                //console.log(data);

                // Keep the css file, even though it's not useful yet.
                ac.assets.addCss('./index.css');
                
                // Place our array of articles in a context object to
                // make referencing it a little more descriptive in the
                // template.
                ac.done({
                    articles: data
                });
                // END CODE CHANGES.
            });
            
            // DELETED CODE
            // remove the older getData function from the code
            // either by commenting out or deleting. We are done with it.
            /*
            ac.models.recentNewsModelFoo.getData(function(err, data) {
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
            */
            // END CODE DELETION
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'recentNewsModelFoo']});
