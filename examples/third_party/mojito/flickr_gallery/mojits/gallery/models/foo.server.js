YUI.add('galleryModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback, query) {
            var yql = ["select farm,server,id,secret",
                "from flickr.photos.search where",
                "text='{query}'", 
                "and api_key='d603eeba3b0eb45badcac352983d1b10'",
                "limit 10"].join(" ");
                
            var yqlCallback = function(response) {
                try {
                    callback(null, response.query.results.photo);
                }
                catch(e) {
                    callback(new Error("Unable to reqtrieve yql results from: " + yql), null);
                }
            };

            query = query || "chicken";
            yql = Y.Lang.sub(yql, { "query": query });
            
            Y.YQL(yql, yqlCallback);
        }

    };

}, '0.0.1', {requires: ['yql']});
