/* Color Codes */
var C_NORM = '\033[1;m',
    C_BOLD = '\033[1;1m',
    C_UNDERLINE = '\033[1;4m',
    C_BLINK = '\033[1;5m',
    C_STRIKETHROUGH = '\033[1;9m',
    C_BLACK = '\033[1;30m',
    C_RED = '\033[1;31m',
    C_GREEN = '\033[1;32m',
    C_YELLOW = '\033[1;33m',
    C_INDIGO = '\033[1;34m',
    C_MAGENTA = '\033[1;35m',
    C_CYAN = '\033[1;36m',
    C_WHITE = '\033[1;37m',
    C_BBLACK = '\033[1;40m',
    C_BRED = '\033[1;41m',
    C_BGREEN = '\033[1;42m',
    C_BYELLOW = '\033[1;43m',
    C_BINDIGO = '\033[1;44m',
    C_BMAGENTA = '\033[1;45m',
    C_BCYAN = '\033[1;46m',
    C_BWHITE = '\033[1;47m',
    //
    // Other constants
    //
    // Check for norm at the end of the line
    RE_NORM_EOL = /\033\[1;m$/gi;
    
var _single = function(s, color) {
        // Make sure we are working with a string
    var str = s + "",
        // Only add the normal code on if it doesn't already exist
        normCode = (str.search(RE_NORM_EOL) == -1) ? C_NORM : "";
    
    return color + str + normCode;
}

// Static functions
var technicolor = {
    // Unlike colors, we want formatting to stand out always, no shortcuts
    blink: function(s) {
        return _single(s, C_BLINK); 
    },
    bold: function(s) {
        return _single(s, C_BOLD); 
    },
    strikethrough: function(s) {
        return _single(s, C_STRIKETHROUGH); 
    },
    underline: function(s) {
        return _single(s, C_UNDERLINE); 
    },
    // Foreground color changes
    b: function(s) {
        return _single(s, C_BLACK); 
    },      
    r: function(s) {
        return _single(s, C_RED); 
    },
    g: function(s) {
        return _single(s, C_GREEN); 
    },
    y: function(s) {
        return _single(s, C_YELLOW); 
    },
    i: function(s) {
        return _single(s, C_INDIGO); 
    },
    m: function(s) {
        return _single(s, C_MAGENTA); 
    },
    c: function(s) {
        return _single(s, C_CYAN); 
    },
    w: function(s) {
        return _single(s, C_WHITE); 
    },
    // background color changes
    bb: function(s) {
        return _single(s, C_BBLACK); 
    },      
    br: function(s) {
        return _single(s, C_BRED); 
    },
    bg: function(s) {
        return _single(s, C_BGREEN); 
    },
    by: function(s) {
        return _single(s, C_BYELLOW); 
    },
    bi: function(s) {
        return _single(s, C_BINDIGO); 
    },
    bm: function(s) {
        return _single(s, C_BMAGENTA); 
    },
    bc: function(s) {
        return _single(s, C_BCYAN); 
    },
    bw: function(s) {
        return _single(s, C_BWHITE); 
    }
};

var mixin_string_prototype = function() {
    var i;

    var wrap = function(func) {
        return function() {
            // Turn our object method into a static function call.
            return func.call(this, this);
        };
    };

    for (i in technicolor) {
        if (technicolor.hasOwnProperty(i)) {
            String.prototype[i] = wrap(technicolor[i]);
        }
    }
};

exports.technicolor = technicolor;
exports.mixin_string_prototype = mixin_string_prototype; 
