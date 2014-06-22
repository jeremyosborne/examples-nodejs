/* jshint undef:true, node:true */

var logger = require("winston");
var async = require("async");
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require("passport");


var cookieSecret = "passport local strategy sample";

var app = express();
app.set("PORT", process.env.PORT || "8080");
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use(session({
    secret: cookieSecret,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());


var LocalStrategy = require('passport-local').Strategy;
var hash = require("./pass").hash;
passport.serializeUser(function(user, next) {
    next(null, user.id);
});
passport.deserializeUser(function(id, done) {
    var User = require("./user").model;
    User.find(id, function(err, user) {
        done(null,user);
    });
});
passport.use('local-login', new LocalStrategy(function (username, password, next) {
    var User = require("./user").model;
    User.find({ email : username }, function(err, user){
        if (err) {
            next(err);
        } else if (!user) {
            next(null, false, { message: 'Incorrect username.' });
        } else {
            hash(password, user.salt, function (err, hashed_password) {
                if (err) {
                    next(err);
                } else if (hashed_password == user.password) {
                    next(null, user);
                } else {
                    next(null, false, { message: 'Incorrect password.' });
                }
            });
        }
    });
}));
passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, username, password, next) {
    var User = require("./user").model;
    User.find({ email :  username }, function(err, user) {
        if (err) {
            next(err);
        } else if (user) {
            next(null, false);
        } else {
            var u = new User();
            u.email = username;
            hash(password, function(err, salt, hashed_password) {
                if (err) {
                    next(err);
                }
                else {
                    u.salt = salt;
                    u.password = hashed_password;
                    u.save(function(err) {
                        next(err, u);
                    });
                }
            });
        }
    });
}));




// Routes
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail.html',
}));
app.use(express.static(__dirname + '/public'));



var appInitArgs = {
    ROOT_DIR: __dirname,
    SQLITE3_PATH: __dirname+"/passportlocal.db",
};

var db = require("./db");
var user = require("./user");
async.applyEachSeries([
    db.init,
    user.init,
],
appInitArgs,
function(err) {
    if (err) {
        logger.err("Problem starting the application:", err);
    }
    else {
        app.listen(app.get("PORT"), function() {
            logger.info("server running on port %s", app.get("PORT"));
        });
    }
});
