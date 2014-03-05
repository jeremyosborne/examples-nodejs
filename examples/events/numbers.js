// Require the local module.
var RandomNumbers = require("./random").RandomNumbers;

// Make use of event emitter.
var randomizer = new RandomNumbers();
// Listen to just one event.
randomizer.once("randomNumber", function(rnum) {
    console.log("once:", rnum);
});
// Listen to all events.
randomizer.on("randomNumber", function(rnum) {
    console.log("every:", rnum);
});

