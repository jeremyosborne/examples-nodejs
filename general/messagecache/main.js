var routes = require("./routes");
var cors = require("cors");


// Starts this instance of bro as a server.
var server = function() {

    var path = require('path');
    var express = require('express');
    var exphbs  = require('express3-handlebars');
    var _ = require("underscore");
    var app = express();

    console.log("Starting server");

    app.set('port', process.env.PORT || 54242);

    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(cors());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    if ('development' == app.get('env')) {
        console.log('Application running in development mode.');
        app.use(express.errorHandler());
    }

    // Register APIs.
    _.each(routes, function(route, routeName, routes) {
        console.log("Registering route:", routeName);
        app.all('/api/'+routeName, routes[routeName].api);
    });

    // Usage page.
    app.all('/', function(req, res) {
        var usages = [];
        var route;

        for (route in routes) {
            if (typeof routes[route].usage == "function") {
                usages.push({usage: routes[route].usage()});
            }
        }

        _.sortBy(usages, "usage");

        res.render('home', {usages: usages});
    });

    app.listen(app.get('port'), function() {
        console.log('Server listening on port ' + app.get('port'));
    });

};



if (require.main === module) {
    // Run as a server.
    server();
}
