YUI.add('alarmDisplay', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        // BEGIN CODE CHANGES
        // simplify down to just what we need.
        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.done({});
        }
        // END CODE CHANGES

    };
// BEGIN CODE CHANGES
// get rid of libs we don't need.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
/* END CODE CHANGES */
