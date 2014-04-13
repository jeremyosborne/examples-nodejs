YUI.add('alarmAPI', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        // BEGIN CHANGES
        // FIRST CHANGE: GET RID OF THE index ACTION!
        // SECOND CHANGE: make the get action.
        get: function(ac) {
            ac.done({
                "message": "get called."
            }, "json");
        },
        
        // THIRD CHANGE: Make the set action.
        set: function(ac) {
            ac.done({
                "message": "set called."
            }, "json");
        },

        // FOURTH CHANGE: Make the delete action.
        del: function(ac) {
            ac.done({
                "message": "del called."
            }, "json");
        }
        // END CODE CHANGE
    };

// BEGIN CODE CHANGE
// get rid of extraneous requires.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
/* END CODE CHANGE. */
