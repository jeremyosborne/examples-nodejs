Read the [the modules docs](http://nodejs.org/api/modules.html). Open `node` from the commandline, run the following commands, and know why they do what they do:

    // Why does this fail?
    require("./mod_fail").theanswer();

    // Why does this will return "but what's the question?"
    require("./mod_index").theanswer();

    // Why does this return 42?
    require("./mod_package").theanswer();
