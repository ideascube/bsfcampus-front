/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',
    ],
    function($, _, Backbone, Config,
             AbstractModel
    ) {

        return AbstractModel.extend({

            jsonKey: "dashboard",

            urlRoot: function() {
                return Config.constants.serverGateway + '/users';
            },

            url: function() {
                return this.urlRoot() + "/" + this.id + "/dashboard";
            }

        });

    }
);
