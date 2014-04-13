window.onload = function() {
    // Populated on connect.
    var userId = null;

    // socket.io object determines type of messaging: JSONP, Web Sockets, etc.
    var socket = io.connect("/");
    // Listen for standard and custom messages.
    socket.on('connect', function() {
        writeMessage({message: "CONNECTED", status: "connected"});
    });
    socket.on('error', function() {
        writeMessage({message: "ERROR: sorry, we are experiencing technical difficulties.", status: "error"});
    });
    socket.on('disconnect', function() {
        writeMessage({message: "DISCONNECTED", status: "disconnect"});
    });
    socket.on('user-id', function(data) {
        userId = data.userId;
        writeMessage({message: "You are user #"+data.userId, status: "connected"});
    });
    socket.on('echo', function (data) {
        data.status = "response";
        writeMessage(data);
    });


    // Templates
    var TEMPLATES = {
        message: Handlebars.compile(document.querySelector("#message-template").text),
    };

    var writeMessage = function(content) {
        if (content.userId == userId) {
            // Don't show messages that the server echoes to us that contain
            // our own userId.
            return;
        }

        var div = document.createElement("div");
        var html = TEMPLATES.message(content);
        var container = document.querySelector("#output");

        div.innerHTML = html;
        // Insert just the template, not the transform div.
        container.insertBefore(div.querySelector("div"), container.firstChild);
    };

    document.querySelector("#status").onkeydown = function(e) {
        // On the return key...
        if (e.which == 13 && this.value) {
            // ...local view...
            writeMessage({message: this.value, status: "sent"});
            // ...and send message to server.
            socket.emit("echo", this.value);
        }
    };

    document.querySelector("#disconnect").onclick = function() {
        socket.disconnect();
    };
};
