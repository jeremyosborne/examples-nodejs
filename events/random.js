// EventEmitter interface common in node.
var EventEmitter = require('events').EventEmitter;

var RandomNumbers = function(){
    // Save a self reference.
    var self = this;

    // Explicit call to constructor (good practice).
    EventEmitter.call(this);

    // Setup an event for each new instance that fires every second in the
    // future to anyone listening and sends a random number explicitly as
    // an argument to each listener.
    setInterval(function() {
        self.emit("randomNumber", Math.ceil(Math.random() * 1000));
    }, 1000);
};
RandomNumbers.prototype = new EventEmitter();

// Make available when required.
module.exports.RandomNumbers = RandomNumbers;
