// Solution
// Notes specific to the lab and not covered previously are embedded in the
// code.
// The example is basically cut and pastable, but the requirement of a server
// spawning an asynchronous request within an asynchronous request will make
// people think who are not used to Node.js or JavaScript (which is by
// design).

var http = require('http');
var PORT = 8080;



// NOTE: To facilitate copy and pasting, note that we've changed the
// code assumed to be copied from the previous request example to use a
// different, less confusing identifier.
http.createServer(function (req, res) {
    var proxyRequest = http.request({
            hostname: 'sports.yahoo.com',
            port: 80,
            method: 'GET'
        }, function(proxyResponse) {
            var responseBody = "";
            proxyResponse.setEncoding('utf8');
            proxyResponse.on('data', function (chunk) {
                responseBody += chunk;
            });
            proxyResponse.on('end', function() {
                // Closure reference. This sends the responseBody back to
                // the response back to the browser, setting headers correctly.
                res.writeHead(200, {
                    // Make sure to change the content type to html otherwise
                    // things will display as plain text in the browser.
                    'Content-Type': 'text/html',
                    // NOTE: While it shouldn't be a problem in North American
                    // requests, this is a fun gotcha we can go over as a class
                    // because content-length should be number of bytes, not
                    // the string length. In languages with wide character
                    // sets (like Chinese), we'll need to make sure we get
                    // raw byte length, not character length.
                    'Content-Length': Buffer.byteLength(responseBody)
                });
                res.end(responseBody);
            });
        });
        proxyRequest.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        proxyRequest.end();

}).listen(PORT);



console.log('Server running at port %s', PORT);
