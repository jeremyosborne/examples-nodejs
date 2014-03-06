// Take a normally callback based procedure and make promise based.

var Q = require("q");
var fs = require("fs");

var inpath = function(p) {
    var deferred = Q.defer();
    fs.readdir(p, function (err, files) {
        deferred.notify("Inside fs.readdir callback.");
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(files);
        }
    });
    return deferred.promise;
};



inpath(".")
    .then(function(results) {
        console.log("Success: List of files:", results);
    }, function(err) {
        console.error("Error", err);
    }, function(message) {
        console.info("Progress:", message);
    });
