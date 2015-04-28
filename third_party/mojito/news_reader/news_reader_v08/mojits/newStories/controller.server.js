YUI.add('newStories', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            ac.assets.addCss('./index.css');
            ac.done({});
        },
        // BEGIN CODE CHANGE
        // Build a new service for discovering the date of the latest news 
        // story.
        latestStory: function(ac) {
            ac.models.get("newStoriesModelLatestStory").get(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                // Send the information back as JSON data in the form of
                // an integer number of milliseconds since the epoch.
                ac.done({
                    latestStory: data.getTime()
                }, 'json');
           });
        }
        // END CODE CHANGE

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon']});
