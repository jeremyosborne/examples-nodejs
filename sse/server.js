var http = require("http");
var express = require('express');
var app = express();

// Change if you want a different port.
app.set("port", 8080);
// Document root has some smarts, like serving index.html to root path.
app.use('/', express.static(__dirname + '/client'));

app.get('/stock-updates', function(req, res) {
    // Determines if this is a valid request (valid via headers).
    if (!req.headers.accept || (req.headers.accept && req.headers.accept != 'text/event-stream')) {
        res.send(404, "Sorry, only accepting event-stream.");
        return;
    }

    // Arbitrary id used for this session.
    var id = Date.now();
    // Fake stock data definition.
    var max = 1000;
    var min = 0;
    var time = 0;
    var price = 500;

    // State of connection info for when disconnecting.
    var isOpen = true;
    var remoteAddress = req.connection.remoteAddress;
    var remotePort = req.connection.remotePort;



    // Hang on for as long as possible.
    req.socket.setTimeout(Infinity);
    // This part of the server-sent events secret sauce.
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    req.connection.on('close', function(){
        console.log("("+remoteAddress+":"+remotePort+") closed connection.");
        isOpen = false;
    });



    (function() {
        var priceDirection;
        var priceDelta;

        // Another part of server sent events secret sauce.
        // Note double newlines at the end of the event.
        res.write('id: ' + id + '\n');
        res.write('data: {\n');
        res.write('data: "price":'+price+",\n");
        res.write('data: "time":'+time+"\n");
        res.write('data: }\n\n');

        // Arbitrary data updates.
        // Modify x (time).
        time += 10;
        // Modify y (stock price).
        priceDirection = (price - max/2) > 0 ? 0.4 : 0.6;
        priceDirection = (Math.random() >= priceDirection) ? +1 : -1;
        priceDelta = Math.floor(Math.random() * 5) * priceDirection;
        price += priceDelta;

        // Keep sending data as long as the socket is open.
        if (isOpen) {
            setTimeout(arguments.callee, 1000);
        }
    })();

});



http.createServer(app).listen(app.get("port"), function() {
    console.log("server listening on:", app.get("port"));
});
