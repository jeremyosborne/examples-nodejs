// testing scoping in Node.js.
//
// Required reading: http://nodejs.org/api/modules.html

console.log("Initializing data module.");

// Not usually a good idea.
global.user1 = "Jane Doe";

// Private to module.
var user2 = "Jane A";

// Public to modules requiring this module.
module.exports.user3 = "Jane Deer";
