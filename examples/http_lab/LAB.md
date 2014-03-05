# LAB: Internet Proxy

* In `server.js`:
    * Using the `http` module, create a server that listens to port 8080.
    * Whenever the server receives a request, proxy the contents of `http://sports.yahoo.com` back through the response (this will require making at least one more http request from the server).
    * Correctly set the HTTP headers `content-type` and `content-length`.
    * Test and confirm things work.
