// But if we're going to serve data, we likely want to serve files.
// And we need a way to parse URLs.
//
// When we're done with this code, try out both of the following URLs:
//
//     http://localhost:8080/
//
// and
//
//     http://localhost:8080/song.txt
//
// Once we're done with this file, move over to request.js.

var http = require('http');
// NEW CODE
// Let's require the url module to help us with parsing a URL.
var url = require('url');
// Let's also require the path module to help us clean up the paths.
var path = require('path');
// And also the filesystem module to help read a file from disk.
var fs = require('fs');



var PORT = 8080;



http.createServer(function (req, res) {
    // Let's see what the user is actually requesting before sending anything
    // back.
    // We can get the URL from the request object.
    var u = url.parse(req.url);
    // For diagnostics, less also look at the raw URL in the logs.
    console.log("Incoming request for: %s", req.url);
    console.log("Generating parsed url object:");
    console.log(u);
    // After adding this, we will probably also see the browser requesting a
    // favicon.ico. We're ignoring this for now.

    // Map the path to a file in our www directory and spin off a read file.
    // request. Note the placement inside of our request callback gives us
    // access to outer variables.
    // We also move our previous response inside of callback.
    // Note that we leave the encoding off to receive a buffer back.
    // In general, buffers are fast in Node.js because all of the data isn't
    // read into memory first (read when needed).
    fs.readFile(path.join("www/", u.pathname), function(err, buffer) {
        if (err) {
            // If we get a file open error, someone is asking for a file we
            // don't have. Just return our default.
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');
        }
        else {
            // It's good practice to send a Content-Length back if we
            // know it.
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                // Buffers provide length in pure bytes, which is what
                // belongs in the Content-Length header.
                'Content-Length': buffer.length
            });
            // Because response implements the writable stream interface,
            // we can pass the buffer directly to the response.
            res.end(buffer);
        }
    });

}).listen(PORT);



console.log('Server running on port %s', PORT);
