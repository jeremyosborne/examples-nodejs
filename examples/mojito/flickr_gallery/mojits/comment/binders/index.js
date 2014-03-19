YUI.add('commentBinderIndex', function(Y, NAME) {

    var mp;

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            mp = mojitProxy;
            mp.listen("image-clicked", function(e) {
                mp.refreshView({ 
                    params: { 
                        url: { photo_id: e.data.id } 
                    }
                });
            });
        },
        onRefreshView: function(node) {
            this.bind(node);
        },
        bind: function(node) {
            node.one("form").on("submit", function(e) {
                var comment = this.one("textarea").get("value");
                var id = this.one("input[type='hidden']").getData("photo_id");
                
                e.preventDefault();
                
                if (comment && id) {
                    mp.invoke("save",
                        { 
                            params: { 
                                url: { photo_id: id, comment: comment } 
                            } 
                        },
                        function(err, json) {
                            if (err) {
                                alert("Sorry, you had an error saving: " + err);
                            }
                            else {
                                mp.refreshView({
                                    params: { 
                                        url: { photo_id: id } 
                                    }
                                });
                            }
                        }
                    );
                }     
            });
        }
    };

}, '0.0.1', {requires: ['mojito-client']});
