YUI.add('mynameBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
             node.on('mouseenter', function(evt) {
                 this.one('.myname').addClass('hover');
             });
             node.on('mouseleave', function(evt) {
                 this.one('.myname').removeClass('hover');
             });
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
