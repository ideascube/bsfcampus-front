define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function($, _, Backbone) {
        var ViewManager = function() {
            this.views = {};

            // Close existing view
            this.closeView = function(name) {
                if ( typeof this.views[name] !== 'undefined') {
                    // Cleanup view
                    // Remove all of the view's delegated events
                    this.views[name].undelegateEvents();
                    // Remove view from the DOM
                    this.views[name].remove();
                    // Removes all callbacks on view
                    this.views[name].off();

                    if ( typeof this.views[name].close === 'function') {
                        this.views[name].close();
                    }
                }
            };

            // this.createView always cleans up existing view before
            // creating a new one.
            // callback function always return a new view instance
            this.createView = function(name, callback) {
                this.closeView(name);
                this.views[name] = callback();
                return this.views[name];
            };

            // this.reuseView always returns existing view. Otherwise it
            // execute callback function to return new view
            // callback function always return a new view instance
            this.reuseView = function(name, callback) {
                if ( typeof this.views[name] !== 'undefined') {
                    return this.views[name];
                }

                this.views[name] = callback();
                return this.views[name];
            };
        };
        return new ViewManager;
    }
);