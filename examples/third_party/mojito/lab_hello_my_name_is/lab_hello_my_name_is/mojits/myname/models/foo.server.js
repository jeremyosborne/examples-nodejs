YUI.add('mynameModelFoo', function(Y, NAME) {
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback) {
            var firstNames = [
                "Bob",
                "Arlo",
                "Boomer",
                "Goober"
            ];
            var firstNameIndex = Math.floor(Math.random()*firstNames.length);
            var lastNames = [
                "Rose",
                "Manson",
                "Plant",
                "Danzig"
            ];
            var lastNameIndex = Math.floor(Math.random()*lastNames.length);
            
            
            callback(null, { 
                name: firstNames[firstNameIndex]+" "+lastNames[lastNameIndex]
            });
        }

    };

}, '0.0.1', {requires: []});
