YUI.add('alarmAPI', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        get: function(ac) {           
            // BEGIN DEBUG CODE CHANGES
            // We need some node.js modules in our code.
            var fs = require('fs');
            var fileData = function(err, data) {
                var status;
                if (err) {
                    status = "could not open the file. Error: " + err;
                }
                else {
                    status = "congrats! opened file with contents: " + data;
                }
                console.log(status)
                ac.done({
                    "message": "get called.",
                    "status": status,
                    // TEST to make sure we can perform a JSON parse (no 
                    // hidden characters in our file).
                    "data": JSON.parse(data)
                }, "json");
            }
            // This is asynchronous.
            fs.readFile(process.cwd() + "/cache.json", fileData);
            // END DEBUG CODE CHANGES
        },
        
        set: function(ac) {
            ac.done({
                "message": "set called."
            }, "json");
        },

        del: function(ac) {
            ac.done({
                "message": "del called."
            }, "json");
        }
    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
