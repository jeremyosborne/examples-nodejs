YUI.add('container', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            ac.assets.addCss('./index.css');
            //
            // ! CODE CHANGE !
            // We can send data to our own template, as a composite mojit,
            // by passing an object to done and passing our own context via
            // the "template" key.
            ac.composite.done({
                template: {
                    // Here we grab any associated configuration data with
                    // our own spec.
                    header: ac.config.get('header') || "simple editor"
                }
            });
        }

    };

// CODE CHANGE
// Need to add support for access to the configuration.
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon', 'mojito-config-addon', 'containerModelFoo']});
