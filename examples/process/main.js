var main = function() {
    console.log("\n\nprocess\n");
    console.log("script arguments:");
    process.argv.forEach(function(arg) {
        console.log("\t"+arg);
    });
    console.log("cwd:", process.cwd());
    console.log("memory usage:", process.memoryUsage());
    console.log("node version:", process.version);

    process.stdout.write("this line mimics console.log()"+"\n");

    console.log("\n");
};

// Equivalent to a main.
if (require.main === module) {
    main();
};
