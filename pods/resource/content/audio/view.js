define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'text!pods/resource/content/audio/template.html'
    ],
    function ($, _, Backbone, VM, Config,
              template) {

        return Backbone.View.extend({

            template: _.template(template),

            render: function () {
                var html = this.template({
                    resource: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                return this;
            }

        });

    }
);
