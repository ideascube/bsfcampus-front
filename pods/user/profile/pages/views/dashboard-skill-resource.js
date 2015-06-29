define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/profile/pages/templates/dashboard-skill-resource-item.html'
    ],
    function($, _, Backbone, Config,
             skillResourceItemTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(skillResourceItemTemplate),

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
