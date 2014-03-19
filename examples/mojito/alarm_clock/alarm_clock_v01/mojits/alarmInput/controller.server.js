YUI.add('alarmInput', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        // BEGIN CODE CHANGE
        // Greatly simplify the displayed value.
        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.done({});
        }
        // END CODE CHANGE
        
    };

// BEGIN CODE CHANGE
// get rid of libraries we don't need.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
/* END CODE INPUT. */
