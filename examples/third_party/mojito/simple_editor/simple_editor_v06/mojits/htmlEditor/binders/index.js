YUI.add('htmlEditorBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            // Use the init to hang onto the mojitProxy since this is the
            // only function that gets it.
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            var mp = this.mojitProxy;
            node.one(".editor").on("keyup", function() {
                // Publish a "editor-content-changed" event on every keypress.
                // This is likely a bit of overkill in a real world scenario,
                // but it will make our example all the more fun and interactive.
                mp.broadcast("editor-content-changed", {
                    "content": this.get("value")
                });
            });
        }

    };

// Clean up the requires statement.
}, '0.0.1', {requires: ['mojito-client']});
