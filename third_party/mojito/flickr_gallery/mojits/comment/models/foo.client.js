YUI.add('commentModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback, photo_id) {
            var comments;
            try {
                comments = JSON.parse(localStorage[photo_id]);
            }
            catch(e) {};
            
            if (!Y.Lang.isArray(comments)) {
                callback(null, [])
            }
            else {
                console.log(comments);
                callback(null, comments);
            }
        },
        
        saveData: function(callback, photo_id, comment) {
            var existingComments;
            try {
                existingComments = JSON.parse(localStorage[photo_id]);
            }
            catch(e) {}
            if (!Y.Lang.isArray(existingComments)) {
                existingComments = [];
            }
            existingComments.unshift({ date: new Date(), comment: comment});
            
            try {
                localStorage[photo_id] = JSON.stringify(existingComments);
                callback(null);
            }
            catch(e) {
                callback(new Error("Could not save comments."));
            }
        } 

    };

}, '0.0.1', {requires: []});
