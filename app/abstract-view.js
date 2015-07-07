define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function ($, _, Backbone, $serialize) {

        return Backbone.View.extend({

            destroyView: function() {

                // COMPLETELY UNBIND THE VIEW
                this.undelegateEvents();

                this.$el.removeData().unbind();

                // Remove view from DOM
                this.remove();
                Backbone.View.prototype.remove.call(this);

            }
        });
    }
);
