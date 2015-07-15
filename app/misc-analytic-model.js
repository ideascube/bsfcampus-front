define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config'
    ],
    function($, _, Backbone, Config) {

        return Backbone.Model.extend({

            type: '',

            title: '',

            url: function() {
                var url = this.urlRoot()
                if (this.type != null && this.type != "")
                {
                    url += "/" + this.type;
                    if (this.title != null && this.title != "")
                    {
                        url += "/" + this.title;
                    }
                }
                return url;
            },

            urlRoot: function () {
                return Config.constants.serverGateway + "/misc_analytics";
            }
        });
    }
);

