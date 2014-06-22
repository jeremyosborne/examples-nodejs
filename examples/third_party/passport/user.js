/* global require, console, setImmediate, module */

// Collaborators ORM.
// Implements process pattern, must be init'd.

var _ = require("underscore");
var path = require("path");
var async = require("async");
var util = require("util");
var Sequelize = require("sequelize");
var logger = require("winston");
var db = require("./db");


// Local reference to the POI model.
var User = null;



// Make model public.
// Expects:
// args {Object} hash of objects
// done {function(err, args)}
var modelExport = function(args, done) {
    module.exports.model = args.User;
    // In module copy for CRUD operations.
    User = args.User;
    done();
};



// Creates the table if it doesn't exist.
//
// Expects:
// args {Object} pass through
// done {function(err, args)}
var tableInit = function(args, done) {
    logger.debug("creating table if it does not exist.");
    args.User.sync()
        .complete(function(err) {
            if (err) {
                done(err);
            }
            else {
                logger.debug("table exists, either now or was previously created.");
                done(null);
            }
        });
};



// Define the model.
//
// Expects:
// args {Object}
// done callback
var modelDefine = function(args, done) {
    // Model has created dates and update dates auto-generated.
    args.User = args.db.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
        },
        salt: {
            type: Sequelize.STRING,
        },
        hash: {
            type: Sequelize.STRING,
        },
    });
    done();
};


// Get the DB connector.
//
// Expects:
// args {Object} pass through
// done {function(err, args)}
var dbConnectionRetrieve = function(args, done) {
    // By this time, the db object should exist and be valid.
    args.db = db.db;
    done();
};



// Initialize database table.
//
// expects
// config {Object} Hash of configuration arguments or empty object if no config.
// done {function(err)} If there is a bad error, callback gets it, otherwise
// no args is good to go.
var init = function(config, done) {

    // Default arguments.
    var args = {
        debug: false,
        // RESERVED: to be populated with a reference to the db connector.
        db: null,
        // RESERVED: to be poplulated with the model reference.
        User: null,
    };

    // Map configuration into our own set of args, don't mess with config.
    _.extend(args, config);

    async.applyEachSeries([
        dbConnectionRetrieve,
        modelDefine,
        tableInit,
        modelExport,
    ],
    // Arguments to pass to each function.
    args,
    function(err) {
        if (typeof err == "string") {
            // Soft exit, not necessarily an error, but we quit from this
            // process and do not continue. Initialization considered done.
            logger.debug(err);
            done();
        }
        else if (err) {
            // Actual error, something is sad.
            logger.debug("something went wrong:", err);
            done(err);
        }
        else {
            logger.debug("done initializing.");
            done();
        }
    });
};



module.exports = {
    init: init,
    // RESERVED. Passes back ORM model.
    model: null,
};
