var fs = require("fs");
var path = require("path");

var echoFile = "echoes.txt";



// Get the echoHistory.
var echoHistory = function(callback) {
    var echoHistory = [];

    fs.readFile(echoFile, "UTF-8", function(err, data) {
        if (err) {
            // Assume this is the first time running.
            callback(null, echoHistory);
        }
        else {
            if (data.length) {
                // Also make the history reverse chronology.
                echoHistory = data.split("\n").reverse();
                // And the way we're saving then splitting our data, we'll have
                // an extraneous empty string. Just get rid of the empty string
                // that, after reversing things, will be in the first position.
                echoHistory = echoHistory.slice(1);
            }
            callback(null, echoHistory);
        }
    });
};



// Add a function that will allow us to save new echoes to our echo history.
// This will also create our file if it does not yet exist.
var saveEcho = function(echo, callback) {
    // File readers and writers are primitives.
    echo = echo ? echo+"\n" : "";

    fs.appendFile(echoFile, echo, function(err) {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    });
};



var main = function() {
    var echo = "";
    console.log("Welcome to the echo caverns.\n");

    if (process.argv.length <= 2) {
        console.log("Usage: %s %s <your message>", process.argv[0],
            path.basename(process.argv[1]));
        return;
    }
    else {
        // Take user input and echo it back.
        echo = process.argv.slice(2).join(" ");
        console.log("echo: %s", echo);

        // This is an example of the pyramid of doom, an anti-pattern.
        echoHistory(function(err, echoHistory) {
            echoHistory.forEach(function(previous) {
                console.log("previous echo: %s", previous.toLowerCase());
            });

            // And add our echo to the echo history.
            saveEcho(echo, function(err) {
                if (err) {
                    console.error("Sorry, problem saving echo history:", err);
                }
                else {
                    console.log("thanks for visiting the echo caverns.");
                }
            });
        });
    }
};



// Equivalent to a main.
if (require.main === module) {
    main();
};
