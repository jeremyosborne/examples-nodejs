YUI.add('detail', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            var photo_id = ac.params.getFromMerged("photo_id");
            ac.models.get('detailModelFoo').getData(function(err, data) {                
                ac.assets.addCss('./index.css');
                ac.done({
                    err: err,
                    detail: data
                });
            }, photo_id);
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'detailModelFoo']});
