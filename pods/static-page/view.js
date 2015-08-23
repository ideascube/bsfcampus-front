define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/static-page/template.html',

        'less!pods/track/styles/list'
    ],
    function ($, _, Backbone, Config,
              staticPageTemplate) {

        return Backbone.View.extend({

            className: 'static-page',

            template: _.template(staticPageTemplate),

            initialize: function () {
                this.listenTo(this.model, "change", this.render);
            },

            render: function () {
                var html = this.template({
                    content: this.model.toJSON(true)
                });
                this.$el.html(html);

                return this;
            }

        });

    }
);
