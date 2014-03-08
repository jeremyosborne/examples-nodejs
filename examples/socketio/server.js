

var express = require('express');
var app = express();
// Document root has some smarts, like serving index.html to root path.
app.use('/', express.static(__dirname + '/client'));



// Part of linking socket.io in with express.
var server = require('http').createServer(app);
server.listen(8080);



// Augment web server with socket.io supprt.
var io = require('socket.io').listen(server);

var userIdCounter = 0;

// Simple management of chat.
io.sockets.on('connection', function (socket) {

    var userId = ++userIdCounter;

    // .once() is better than .on() for the disconnect.
    // Called when the socket hangs up for some reason.
    socket.once('disconnect', function() {
        socket.disconnect();
    });

    // Send to just this connection.
    socket.emit('user-id', {userId: userId});

    // The client and server can publish any number of custom events.
    socket.on('echo', function (data) {
        // Send to all connections.
        io.sockets.emit('echo', {userId: userId, message: data});
    });
});

