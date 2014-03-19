// BEGIN CODE CHANGES
// name change
// This model will represent a list of the recent Yahoo! news stories.
YUI.add('recentNewsModelArticles', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        // shorten the function name to just "get"
        get: function(callback) {
            // callback for the YQL query, pulled out of the function to
            // cut down on the level of indentation required for this example.
            var handleResponse = function(response) {
                // The news articles are found in this JSON response.
                var items = response.query.results.item;
                // Counter vars.
                var i; 
                
                if (!items || (items && !items.length)) {
                    // Always return an array.
                    items = [];
                }
            
                // Iterate the query.results.item array.
                // Use the following structure of contents within the *.item array:
                //     item.title -> title of the article.
                //     item.pubDate -> publish date of article (ISO time string).
                //     item.source -> meta information about who published
                //         this article.
                //     item.source.content -> display name of the source.
                //     item.source.url -> hyperlink to the source.
                //     item.description -> Short summary of our information.
                for (i = 0; i < items.length; i++) {
                    // Convert the date into a JavaScript date.
                    // The dates should be in ISO date format, and since
                    // node.js is ECMAScript 5 compliant, we can turn the
                    // date into a JavaScript object.
                    items[i].pubDate = (new Date(items[i].pubDate));    
                }
                
                // Send the data back.
                callback(null, items);
            };

            // Make the request to the server for the news articles.
            Y.YQL(
                "select * from rss where url='http://rss.news.yahoo.com/rss/topstories'", 
                handleResponse
            );
        }

    };

// We need the YQL module.
}, '0.0.1', {requires: ['yql']});
/* END CODE CHANGES */
