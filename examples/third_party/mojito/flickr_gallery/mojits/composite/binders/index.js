YUI.add('compositeBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            // node.one(".label").on("mouseenter", function(e) {
                // this.transition({
                    // backgroundColor: "pink",
                    // color: "white"
                // });
            // });
            // node.one(".label").on("mouseleave", function(e) {
                // this.transition({
                    // backgroundColor: "white",
                    // color: "pink"
                // });
            // });
        }

    };
}, '0.0.1', {requires: ['transition', 'event-mouseenter', 'mojito-client']});
