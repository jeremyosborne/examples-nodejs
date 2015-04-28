YUI.add('detailBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mp) {
            mp.listen("image-clicked", function(e) {
                mp.refreshView({ 
                    params: { 
                        url: { photo_id: e.data.id } 
                    } 
                });
            });
        },
        bind: function(node) {}
    };

}, '0.0.1', {requires: ['mojito-client']});
