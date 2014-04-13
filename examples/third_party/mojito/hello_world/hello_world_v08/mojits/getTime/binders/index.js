YUI.add('getTimeBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            var me = this;
            this.node = node;
            node.all('dt').on('mouseenter', function(evt) {
                var dd = '#dd_' + evt.target.get('text');
                me.node.one(dd).addClass('sel');
            });
            node.all('dt').on('mouseleave', function(evt) {
                var dd = '#dd_' + evt.target.get('text');
                me.node.one(dd).removeClass('sel');
            });
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
