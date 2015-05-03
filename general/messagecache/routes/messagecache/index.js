/* jshint unused:true, undef:true, node:true */

var fs = require("fs");
var path = require("path");
var marked = require("marked");
var shortId = require("shortid");


// Read the usage file once.
var USAGE = fs.readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};



var cache = {};
exports.api = function(req, res) {
    if (req.param("reset")) {
        // reset takes precedence
        cache = {};
        res.send({
            "info": "Message cache reset."
        });
    } else if (req.param("getid")) {
        // Trust the docs that shortId is super duper unique.
        res.send({
            "id": shortId.generate()
        });
    } else if (req.param("history")) {
        res.send(cache);
    } else if (req.param("key") && req.param("value")) {
        var value = req.param("value");
        try {
            value = JSON.parse(value);
        } catch(e) {
            // Do nothing, store string value.
        }
        cache[req.param("key")] = value;
        res.send({
            "info": "Message added.",
        });
    } else {
        res.send(400, {
            "info": "You failed to obey the API.",
        });
    }
};
