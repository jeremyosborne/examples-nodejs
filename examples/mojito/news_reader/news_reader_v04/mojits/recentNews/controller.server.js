YUI.add('recentNews', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {
        

        index: function(ac) {

            ac.models.get("recentNewsModelArticles").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }

                // BEGIN CODE CHANGE
                // Ideally it would be nice to register a Handlebars helper
                // that could do something like:
                ac.helpers.set('formatDate', function(date) {
                    return Y.DataType.Date.format(new Date(date), {format:"%Y.%m.%d (%A)"});
                });
                // END CODE CHANGE
                
                ac.assets.addCss('./index.css');
                ac.done({
                    articles: data
                });
            });            
        }
    };

// BEGIN CODE CHANGE
// require datatype to format the date.
// Need to require 'mojito-helpers-addon' to register the helper.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'recentNewsModelFoo', 'mojito-helpers-addon', 'datatype']});
/* END CODE CHANGE */
