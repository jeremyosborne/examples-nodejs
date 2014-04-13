YUI.add('container', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            // This will be our page wide CSS.
            // We will come back and edit this later.
            ac.assets.addCss('./index.css');
            // Pass the request on to our children mojits.
            ac.composite.done();
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon', 'containerModelFoo']});
