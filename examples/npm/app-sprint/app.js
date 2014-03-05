
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

// Add this include
var exphbs  = require('express3-handlebars');
// Our simple database.
var db = require("./src/db");


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// Comment out Jade.
//app.set('view engine', 'jade');
// Add in express3-handlebars.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Get rid of original.
//app.get('/', routes.index);
//app.get('/users', user.list);
// For our simple app, code in the app.js.
app.get('/', function (req, res) {
    res.render('home');
});
// Handle form posts:
app.post('/', require('./routes/index_post.js'));

// Initialize the database before starting the server.
db.init(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        http.createServer(app).listen(app.get('port'), function(){
          console.log('Express server listening on port ' + app.get('port'));
        });
    }
});
