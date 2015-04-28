var Q = require("q");

var sqlite3 = require('sqlite3').verbose();
var db;
var dbInit = false;



var createDb = function() {
    var deferred = Q.defer();
    db = new sqlite3.Database(':memory:', function(err) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.notify("Successfully opened db.");
            deferred.resolve();
        }

    });
    return deferred.promise;
};



// Stream of initialization.
var createTable = function() {
    var deferred = Q.defer();
    db.run("CREATE TABLE numbers (number INTEGER)", function(err) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.notify("Successfully created table.");
            deferred.resolve();
        }
    });
    return deferred.promise;
};



var populateTable = function() {
    var deferred = Q.defer();
    var stmt = db.prepare("INSERT INTO numbers VALUES (?)", function() {
        var i;
        for (i = 0; i < 10; i++) {
            stmt.run(i, function(err) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.notify("Inserted value...");
                }
            });
        }
        stmt.finalize(function() {
            deferred.notify("Database populated");
            deferred.resolve();
        });
    });

    return deferred.promise;
};



var handleErrors = function(e) {
    console.error("ERROR:", e);
};



var notifications = function(message) {
    if (message) {
        console.log("NOTIFY:", message);
    }
};



var p = createDb()
    .then(
        function() {
            return createTable();
        },
        handleErrors,
        notifications
    )
    .then(
        function() {
            return populateTable();
        },
        handleErrors,
        notifications
    )
    .catch(function(err) {
        console.error("Catch method:", err);
    })
    .done(
        function() {
            console.log("Done.");
            dbInit = true;
        },
        handleErrors,
        notifications
    );



// Export a function that can be called anytime and returns a promise always.
exports.all = function() {
    var deferred = Q.defer();
    var process = function() {
        var sql = function() {
                db.all("SELECT * from numbers", function(err, rows) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(rows);
                }
            });
        };
        if (!dbInit) {
            setTimeout(function() {
                // restart the process.
                process();
            }, 10);
        }
        else {
            // If we're good....
            sql();
        }
    };
    process();

    return deferred.promise;
};


// Test
if (require.main === module) {
    exports.all()
        .done(function(rows) {
            console.log("Rows retrieved:", rows);
        }, function(e) {
            console.error("Error in all:", e);
        });
};
