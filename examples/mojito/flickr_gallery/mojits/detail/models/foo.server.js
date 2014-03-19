YUI.add('detailModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback, id) {
            var yql = ["select *",
                "from flickr.photos.info where",
                "photo_id='{id}'", 
                "and api_key='d603eeba3b0eb45badcac352983d1b10'"].join(" ");
                
            var yqlCallback = function(response) {
                //Y.log(response.query.results.photo);
                try {
                    callback(null, response.query.results.photo);
                }
                catch(e) {
                    callback(new Error("Unable to reqtrieve yql results from: " + yql), null);
                }
            };

            //id = id || "2439864402";
            id = id || "";
            yql = Y.Lang.sub(yql, { "id": id });
            
            Y.YQL(yql, yqlCallback);
        }

    };

}, '0.0.1', {requires: ['yql']});
