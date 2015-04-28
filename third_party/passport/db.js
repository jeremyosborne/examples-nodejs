/* global require, console, setImmediate, module */

//
// Db connector.
//

var async = require("async");
var Sequelize = require("sequelize");
var _ = require("underscore");
var logger = require("winston");




// Make our database available to the public.
//
// Expects:
// args {Object} pass through
// done {function(err, args)}
var dbExport = function(args, done) {
    module.exports.db = args.db;
    done();
};



// Expects:
// args {Object} pass through
// done {function(err, args)}
var dbConnect = function(args, done) {
    args.db.authenticate()
        .complete(function(err) {
            if (err) {
                logger.error("Unable to create database:", err);
                done(err);
            }
            else {
                logger.debug("Database connection established.");
                done();
            }
        });
};



// Make the DB object.
//
// Expects:
// args {Object} pass through
// done {function(err, args)}
var dbCreate = function(args, done) {
    if (!args.SQLITE3_PATH) {
        done(new Error("Must SQLITE3_PATH args."));
        return;
    }
    // Database connection.
    var db = new Sequelize("database", "username", "password", {
        dialect: "sqlite",
        storage: args.SQLITE3_PATH,
        // Makes the underling SQL statements show up if true.
        logging: args.debug,
    });
    args.db = db;
    done();
};



// Initialize database connector.
//
// expects
// config {Object} Hash of configuration arguments or empty object if no config.
// done {function(err)} If there is a bad error, callback gets it, otherwise
// no args is good to go.
var init = function(config, done) {
    // Default arguments.
    var args = {
        debug: false,
        // RESERVED. Construct and pass db object through function pipeline.
        db: null,
    };
    // Map configuration into our own set of args, don't mess with config.
    _.extend(args, config);



    async.applyEachSeries([
        dbCreate,
        dbConnect,
        dbExport,
    ],
    // Arguments to pass to each function.
    args,
    function(err) {
        if (typeof err == "string") {
            // Soft exit, not necessarily an error, but we quit from this
            // process and do not continue. Initialization considered done.
            logger.debug(err);
            done(null);
        }
        else if (err) {
            // Actual error, something is sad.
            logger.debug("db: something went wrong:", err);
            done(err);
        }
        else {
            logger.debug("db: done initializing.");
            done();
        }
    });
};



module.exports = {
    init: init,
    // RESERVED. After init, db will be attached.
    db: null,
};
