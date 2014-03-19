YUI.add('getTimeBinderServerTime', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
            // BEGIN CODE CHANGE
            // We can use the mojitProxy to cause a refresh of our
            // application. This is an extremely simple version of how to
            // use the mojitProxy.
            var self = this;
            setInterval(function() {
                self.mojitProxy.refreshView();
            }, 1000);
            // END CODE CHANGE.            
        },
                
        bind: function(node) {            
            node.one('.server-time').on('mouseenter', function(evt) {
                this.setStyle("backgroundColor", "red");
            });
            node.one('.server-time').on('mouseleave', function(evt) {
                this.setStyle("backgroundColor", "");
            });
        },
        
        // BEGIN CODE CHANGE
        // This event listener will be called when a mojit is refreshed.
        // One thing about the refresh, is that we'll get a new node, and
        // we'll need to reattach any node events that we generated in
        // bind on the initial view of the page.
        // A refreshView is not a page reload, it's an AJAX refresh.
        onRefreshView: function(node) {
            // Rebind our events.
            this.bind(node);
        },
        // END CODE CHANGE

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
