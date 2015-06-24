/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/profile/pages/templates/dashboard-track-tablet-item.html'
    ],
    function($, _, Backbone, Config,
             trackItemTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(trackItemTemplate),

            render: function() {
                var modelSON = this.model.forTemplate();
                modelSON.validatedStatus = (modelSON.is_validated) ? "validated" : "";
                var html = this.template({track: modelSON, config: Config});
                this.$el.html(html);

                return this;
            }

        });

    }
);
