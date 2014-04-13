YUI.add('comment', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            var photo_id = ac.params.getFromMerged("photo_id");
            ac.assets.addCss('./index.css');
            ac.models.get('commentModelFoo').getData(function(err, data) {                
                ac.done({
                    err: err,
                    photo_id: photo_id,
                    comments: data
                });
            }, photo_id);
        },
        
        save: function(ac) {
            var photo_id = ac.params.getFromMerged("photo_id");
            var comment = ac.params.getFromMerged("comment");

            ac.models.get('commentModelFoo').saveData(function(err) {
                ac.done({
                    err: err
                }, "json");
            }, photo_id, comment);
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'commentModelFoo']});
