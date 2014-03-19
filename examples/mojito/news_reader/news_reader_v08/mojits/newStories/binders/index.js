YUI.add('newStoriesBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
            
            // BEGIN CODE CHANGES
            // Need some starting value against which to determine whether
            // or not we have a new story.
            this.latestStoryTime = Infinity;
            // END CODE CHANGES
        },

        // BEGIN CODE CHANGES
        // If there is a new news story, show the 
        // node.one(".new-stories-notifications").
        // Also bind a reload event to the node to refresh the page.
        bind: function(node) {
            // Closure reference.
            var self = this;
            
            // Set up the click and refresh event for when this gets shown.
            node.one(".new-stories-notifications").on("click", function() {
                window.location.reload();
            });
            
            // Every 5 seconds, poll the server and see if we have a story
            //
            setInterval(function() {
                Y.io('/latestStory', {
                    on: {
                        success: function (id, xhr) {
                            try {
                                data = Y.JSON.parse(xhr.responseText);
                                if (data.latestStory > self.latestStory) {
                                    node.one(".new-stories-notifications").setStyle("display", "block");
                                }
                                else {
                                    // Compare future requests against what
                                    // the server says is the latest story.
                                    self.latestStory = data.latestStory;
                                }
                            }
                            catch (e) {
                                Y.log(e)
                            }
                        }
                    }
                });
            }, 5000);
        }
        // END CODE CHANGES

    };
// BEGIN CODE CHANGE
// Not really necesary, but we can delete the YUI module we don't need.
// We _do_ need the 'io' module and the 'json' module.
}, '0.0.1', {requires: ['mojito-client', 'io', 'json']});
/* END CODE CHANGES */
