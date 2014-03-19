YUI.add('recentNewsModelArticles', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        get: function(callback) {
            var handleResponse = function(response) {
                var items = response.query.results.item;
                var i; 
                
                if (!items || (items && !items.length)) {
                    items = [];
                }
            
                for (i = 0; i < items.length; i++) {
                    items[i].pubDate = (new Date(items[i].pubDate));    
                }
                
                callback(null, items);
            };

            Y.YQL(
                "select * from rss where url='http://rss.news.yahoo.com/rss/topstories'", 
                handleResponse
            );
        }

    };

}, '0.0.1', {requires: ['yql']});
