YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.composite.done({
                copyrightYear: new Date().getFullYear(),
                header: ac.config.get("header")
            });
        }
    };
}, '0.0.1', {requires: ['mojito', 'mojito-config-addon', 'mojito-composite-addon', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});