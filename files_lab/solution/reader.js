var fs = require("fs");

fs.readFile("access.log", "utf-8", function(err, logs) {
    var unique = {};
    var ip;

    // Assume separation by newline.
    logs = logs.split("\n").filter(function(line) {
        // Blank lines are cleaned.
        return line.trim();
    });

    logs.forEach(function(line) {
        var ip = line.split(" ", 1)[0];
        if (ip && ip.trim()) {
            ip = ip.trim();
            if (ip in unique) {
                unique[ip] += 1;
            }
            else {
                unique[ip] = 1;
            }
        }
    });

    console.log("\n");
    console.log("Total # log entries:", logs.length);
    console.log("Unique ip access counts (unsorted):");
    for (ip in unique) {
        console.log("%s\t%s", unique[ip], ip);
    }
    console.log("\n");
});
