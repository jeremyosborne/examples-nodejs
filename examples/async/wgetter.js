var request = require("request");
var async = require("async");
var fs = require("fs");
var util = require("util");



var outcount = 0;
var contentToFile = function(contentBody, done) {
    var fileName;

    fileName = util.format("out%s.txt", outcount++);

    fs.writeFile(fileName, contentBody, function(err) {
        done(err, fileName);
    });
};



var getURL = function(url, done) {
    request(url, function(error, response, contentBody) {
        if (error || response.statusCode != 200) {
            done("Could not retrieve the URL: "+url);
        }
        else {
            done(null, contentBody);
        }
    });
};



// Build a function that can be added to an async process.
var processFactory = function(url) {

    return function(done) {

        async.waterfall([
            function(done) {
                console.log("making request to retrieve contents of %s.", url);
                done(null, url);
            },
            getURL,
            contentToFile
        ],
        function(err, file) {
            if (err) {
                console.error("Problems with %s.", url);
                console.error(err);
            }
            else {
                console.log("Successfully wrote %s out to file %s.", url, file);
            }
            done();
        });

    };

};



if (process.argv.length < 3) {
    console.log("Usage: %s %s [list of urls]", process.argv[0], process.argv[1]);
}
else {
    var processList = process.argv.slice(2).map(function(url) {
        return processFactory(url);
    });
    async.parallel(processList);
}

