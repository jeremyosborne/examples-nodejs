YUI.add('newsContainer', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {
        

        // BEGIN CODE CHANGES
        index: function(ac) {
            // This is a composit mojit, used to contain children
            // mojits. Pass the action onto the children mojits.
            ac.composite.done();
        }
        // END CODE CHANGES

    };
// BEGIN CODE CHANGES
// We must require 'mojito-composite-addon'
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
