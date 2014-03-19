YUI.add('container', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.composite.done({
                template: {
                    header: ac.config.get('header') || "simple editor"
                }
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon', 'mojito-config-addon', 'containerModelFoo']});
