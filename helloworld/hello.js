// Run code with:
//
//     node hello.js

console.log("Hello world!");

// Some module specific variables.
console.log("This file %s", __filename);
console.log("This directory %s", __dirname);

// Global variables.
console.log("global %s.", typeof global != "undefined" ? "exists" : "doesn't exist");
console.log("window %s.", typeof window != "undefined" ? "exists" : "doesn't exist");


// Require a module from the available node path
// (here the path module from the standard library).
var path = require("path");
console.log("fake directory:", path.join(__dirname, "tmp"));

// Node.js is ECMAScript 5 compliant at the time of this writing.
var obj = {
    "hello": "world",
};
["hello", "world"].forEach(function(item, i) {
    console.log("Item %s: %s", i, item);
});

