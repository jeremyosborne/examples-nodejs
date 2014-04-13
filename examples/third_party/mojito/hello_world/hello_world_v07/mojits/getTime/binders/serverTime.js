// BEGIN CODE CHANGE
// Naming scheme for module: {mojit}Binder{Action}
YUI.add('getTimeBinderServerTime', function(Y, NAME) {
// END CODE CHANGE

    Y.namespace('mojito.binders')[NAME] = {

        // NOTES ONLY NO CODE CHANGE
        // Init is called first, and is passed the mojitProxy object which
        // is an important gateway back to the mojito framework (server side).
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        
        // BEGIN CODE CHANGES
        // The bind method is passed a Y.Node instance that wraps the DOM 
        // node representing this mojit instance within the DOM.
        // IT IS IMPORTANT that our template has an element with an id set
        // to {{mojit_view_id}} otherwise our bind method may not be called
        // (rendering our binder useless).
        // We keep this close to the original code on this go round so as not
        // to require too much work (and too many chances for bugs).
        bind: function(node) {
            // Something very simple: When we mouse over the clock,
            // we change the backgroundColor.
            node.one('.server-time').on('mouseenter', function(evt) {
                this.setStyle("backgroundColor", "red");
            });
            node.one('.server-time').on('mouseleave', function(evt) {
                this.setStyle("backgroundColor", "");
            });
        }
        // END CODE CHANGES

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
