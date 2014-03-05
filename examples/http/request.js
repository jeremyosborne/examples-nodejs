// Let's build a separate client that will make HTTP requests from
// Node.js to our simple server that we developed.
//
// Once this file is done, start up the server in one terminal
// and run this file in another terminal window.
//

// The http module is also responsible for making requests.
var http = require('http');

// Set up the options for our request. We must define each
// piece explicitly. There are many modules that can help us
// simplify this process :)
var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/song.txt',
    method: 'GET'
};

// Make the request. This actually spawns a request object that itself is
// an EventEmitter.
var req = http.request(options, function(res) {
    // Due to the nature of the web, HTTP responses can come back in
    // chunks. If we care, which we do, we need to piece the chunks
    // together to capture the complete response.
    var responseBody = "";

    console.log("Response from server started.");
    console.log('Server status: %s', res.statusCode);
    // The %j is for JSON parsing of output, just in case I forgot to
    // mention it earlier.
    console.log('Response headers: %j', res.headers);

    // This forces the response data into a string type vs. a buffer
    // type during the data callbacks.
    res.setEncoding('utf8');
    // Multiple data events can fire during a request process depending
    // on how the response is sent to us (chunked or not).
    // We catch each chunk as it is sent to us.
    res.on('data', function (chunk) {
        console.log("Receiving a chunk of data from the server.");
        // Capture chunks of data.
        responseBody += chunk;
    });
    // The end event fires exactly once and is not passed any data.
    // Once we're here, we've collected all the data through the
    // 1 through n data events that fire.
    res.on('end', function() {
        console.log("Response from the server done. The response body was:");
        console.log(responseBody);
    });
});

// Just in case we have an error this will help us debug it.
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// And we need to signal that we've sent the request and we're sending no
// more data.
req.end();
