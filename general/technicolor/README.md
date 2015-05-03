# technicolor

Technicolor changes plain text to color coded text using [ANSI Color](http://en.wikipedia.org/wiki/Ansi_color) codes.

Good for colorizing text in terminal output.

Not for use on the client side.



## Usage
Assuming [Node.js](http://nodejs.org) is installed:

    // 1) Use statically:
    var tc = require('./technicolor.js').technicolor;
    console.log(tc.r("red text"));

    // 2) Modify the String prototype:
    require('./technicolor.js').mixin_string_prototype();
    console.log("yellow text, background green".y().bg());
