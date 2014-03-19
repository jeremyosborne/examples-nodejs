YUI.add('newStories', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            // BEGIN CODE CHANGES
            // All we're doing is simplifying the file down to just
            // what we need. Most of the code will be located in the
            // binder.
            ac.assets.addCss('./index.css');
            ac.done({});
            // END CODE CHANGES
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon']});
