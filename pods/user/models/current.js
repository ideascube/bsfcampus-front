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

        var CurrentUserClass = AbstractModel.extend({

            jsonKey: "user",

            urlRoot: function() {
                return Config.constants.serverGateway + '/users/current';
            },

            url: function() {
                return this.urlRoot();
            }

        });

        return new CurrentUserClass;

    }
);
