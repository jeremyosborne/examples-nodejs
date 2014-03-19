YUI.add('alarmInput', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.done({});
        }
        
    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-composite-addon']});
