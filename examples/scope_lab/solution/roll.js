// Require our local dice module.
var dice = require("./dice");

// dice points to the export object, and whatever we attached to it, so...
console.log("Rolling a default sided die:", dice.roll());
console.log("Rolling a 20 sided die:", dice.roll(20));

// Confirm defaultFaces is not exported.
console.log("The typeof defaultFaces is:", typeof defaultFaces);
console.log("The typeof dice.defaultFaces is:", typeof dice.defaultFaces);
