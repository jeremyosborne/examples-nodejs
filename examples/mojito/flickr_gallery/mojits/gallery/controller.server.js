YUI.add('gallery', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            var query = "chicken";
            ac.models.get('galleryModelFoo').getData(function(err, data) {
                ac.assets.addCss('./index.css');
                if (!err) {
                    ac.done({
                        query: query,
                        err: null,
                        photos: data
                    });
                }
                else {
                    ac.done({
                        query: query,
                        err: err,
                        photos: null
                    });
                }
            }, query);
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'galleryModelFoo']});
