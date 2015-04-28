YUI.add('newStoriesModelLatestStory', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        // BEGIN CODE CHANGE
        // Retrieve the latest date of articles from YQL.
        get: function(callback) {
            var handleResponse = function(response) {
                // Note: When retrieving one item, results is not an
                // array but an Object.
                var date = response.query.results.item.pubDate;
                callback(null, new Date(date));
            };

            Y.YQL(
                "select * from rss where url='http://rss.news.yahoo.com/rss/topstories' | sort(field='start_date') | truncate(count=1)", 
                handleResponse
            );
        }
        // END DATE.

    };

}, '0.0.1', {requires: ['yql']});
