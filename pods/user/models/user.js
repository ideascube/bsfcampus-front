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

            urlRoot: function() {
                return Config.constants.serverGateway + '/users';
            },

            url: function() {
                return this.urlRoot() + "/" + this.id;
            }

        });

    }
);
