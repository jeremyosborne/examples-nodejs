YUI.add('getTime', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        

        index: function(ac) {
            ac.models.get("getTimeModelFoo").getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        },
        
        serverTime: function(ac) {
            ac.models.get("getTimeModelTime").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                
                // BEGIN CODE CHANGE
                // We want to use a date and time with minutes and seconds.
                data.time = Y.DataType.Date.format(data.time, {format:"%x %X"});
                // END CODE CHANGE
                
                ac.assets.addCss('./serverTime.css');
                ac.done(data);
            });
        }

    };

// BEGIN CODE CHANGE
}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'getTimeModelFoo', 'datatype', 'mojito-intl-addon']});
/* END CODE CHANGE */
