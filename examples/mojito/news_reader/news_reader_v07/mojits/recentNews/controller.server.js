YUI.add('recentNews', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {
        

        index: function(ac) {

            ac.models.get("recentNewsModelArticles").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                                
                ac.helpers.set('formatDate', function(date) {
                    return Y.DataType.Date.format(new Date(date), {format:"%Y.%m.%d (%A)"});
                });

                ac.assets.addCss('./index.css');
                ac.done({
                    articles: data
                });
            });            
        }
    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'recentNewsModelFoo', 'mojito-helpers-addon', 'datatype']});
