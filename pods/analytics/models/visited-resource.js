define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config'
    ],
    function($, _, Backbone, Config) {

        return Backbone.Model.extend({

            url: function() {

                return this.urlRoot() + "/" + this.id;
            },

            urlRoot: function () {
                return Config.constants.serverGateway + "/activity/visited_resource";
            }
        });
    }
);

