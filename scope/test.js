// Testing module scoping in data.js.

console.log("user1 exists?", typeof user1 == "undefined" ? "no" : "yes");
console.log("user2 exists?", typeof user2 == "undefined" ? "no" : "yes");

var data = require("./data");

console.log("user1 exists?", typeof user1 == "undefined" ? "no" : "yes");
console.log("user2 exists?", typeof user2 == "undefined" ? "no" : "yes");
console.log("user3 exists on module?",
    typeof data.user3 == "undefined" ? "no" : "yes");

// In general, not a good practice, but this is in the name of science.
data.user4 = "Jane A Female Deer";

// Modules at a specific path are run once for initialization.
// The second require retrieves from cache.
var data2 = require("./data");

console.log("user4 is named:", data2.user4);

