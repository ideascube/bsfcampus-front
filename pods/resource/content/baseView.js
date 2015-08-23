define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view'
    ],
    function ($, _, Backbone, Config,
              AbstractView) {

        return AbstractView.extend({

            renderFetched: function () {
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
