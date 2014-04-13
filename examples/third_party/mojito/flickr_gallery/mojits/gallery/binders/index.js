YUI.add('galleryBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
            var mp = this.mojitProxy;
            node.delegate("click", function() {
                var photo_id = this.one("img").getData("photo_id");
                mp.broadcast("image-clicked", {
                    id: photo_id
                });
            }, "li");
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
