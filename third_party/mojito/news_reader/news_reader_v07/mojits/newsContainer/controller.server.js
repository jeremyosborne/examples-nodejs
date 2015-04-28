YUI.add('newsContainer', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {
        
        index: function(ac) {
            ac.composite.done();
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
