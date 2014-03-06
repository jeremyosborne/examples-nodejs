var Q = require("q");



// Promise factory.
// Is the cat alive or dead?
var schroedinger = function() {
    var alive = Math.random() > 0.5 ? true : false;
    // Allow thrown errors to be passed instead of caught.
    return Q.fcall(function () {
        if (alive) {
            return "it's alive";
        }
        else {
            throw new Error("It's dead.");
        }
    });
};



var p = schroedinger();
p.then(function(val) {
    console.log("Success:", val);
}, function(e) {
    console.error("Failure:", e);
});
// Nature promises: deferred by default.
console.log("Before schroedinger promise resolution.");




