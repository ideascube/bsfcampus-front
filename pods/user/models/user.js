/**
 * Created by Fred on 10/06/2015.
 */
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

            jsonKey: "user",

            urlRoot: function() {
                return Config.constants.serverGateway + '/users';
            },

            url: function() {
                return this.urlRoot() + "/" + this.id;
            }

        });

    }
);
