YUI.add('htmlPreviewBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            // This is awkward, but since the init is the only place where
            // we get the mojitProxy, and the bind is the only place we
            // receive a reference to our mojit container node, we choose
            // to save the mojitProxy here and do the work in our bind
            // method.
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            // Since the bind method is the only spot where we receive our
            // node instance, set up our listener here.
            this.mojitProxy.listen("editor-content-changed", function(payload) {
                // We get the data package and set ourselves.
                // The "payload" is much like an event object in the YUI
                // world. Not sure why mojito tried to be different rather
                // than just use the "on" method....
                node.one(".preview").setHTML(payload.data.content);
            });
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
