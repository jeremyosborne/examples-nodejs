YUI.add('htmlPreview', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            // We'll add our own CSS.
            ac.assets.addCss('./index.css');
            // We call ac done to trigger the rendering of our view.
            ac.done({});
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'htmlPreviewModelFoo']});
