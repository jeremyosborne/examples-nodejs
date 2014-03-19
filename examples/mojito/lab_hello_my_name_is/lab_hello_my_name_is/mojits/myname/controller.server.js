YUI.add('myname', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            ac.models.get("mynameModelFoo").getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done(data);
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mynameModelFoo']});
