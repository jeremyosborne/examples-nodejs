console.log("");
console.log("Begin blackbox tests.");
console.log("");


var tc = require('../technicolor.js').technicolor;

console.log("-- Formatting Tests (varies heavily in terminals) --");
console.log(tc.blink("blink text"));
console.log(tc.bold("bold text"));
console.log(tc.strikethrough("strikethrough text"));
console.log(tc.underline("underline text"));
console.log("-- Foreground Tests --");
console.log(tc.b("black"));
console.log(tc.r("red"));
console.log(tc.g("green"));
console.log(tc.y("yellow"));
console.log(tc.i("indigo"));
console.log(tc.m("magenta"));
console.log(tc.c("cyan"));
console.log(tc.w("white"));
console.log("-- Background Tests --");
console.log(tc.bb("background black"));
console.log(tc.br("background red"));
console.log(tc.bg("background green"));
console.log(tc.by("background yellow"));
console.log(tc.bi("background indigo"));
console.log(tc.bm("background magenta"));
console.log(tc.bc("background cyan"));
console.log(tc.bw("background white"));
console.log("-- Multiple Tests --");
console.log(tc.y(tc.bg("yellow text, background green")));

console.log("-- Changing String Prototype --");
require('../technicolor.js').mixin_string_prototype();

console.log("-- Testing String Prototype Changes --");
console.log("yellow text, background green".y().bg());
