define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/resource/model',
        'text!pods/resource/templates/back-to-main-resource-nav.html'

    ],
    function ($, _, Backbone, Config,
              AbstractView,
              ResourceModel, backToResourceNavTemplate) {

        return AbstractView.extend({

            className: 'panel',

            template: _.template(backToResourceNavTemplate),

            renderFetched: function () {
                var html = this.template({resource: this.model.toJSON(true)});
                this.$el.html(html);

                return this;
            }

        });

    }
)
;
