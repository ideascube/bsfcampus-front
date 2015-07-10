define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model'
    ],
    function($, _, Backbone, Config,
             AbstractModel
    ) {

        return AbstractModel.extend({

            serverPath: function() {
                return '/users'
            },

            url: function() {
                return this.urlRoot() + "/" + this.id + "/dashboard";
            }

        });

    }
);
