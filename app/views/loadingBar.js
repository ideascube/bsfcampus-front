define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!app/templates/loading-bar.html'
    ],
    function ($, _, Backbone, Config,
              template) {

        return Backbone.View.extend({

            className: 'container-fluid',

            template: _.template(template),

            render: function () {
                var loadingText = _.result(this, 'loadingText', Config.stringsDict.LOADING);
                var containerClassName = _.result(this, 'containerClassName', 'col-xs-12');

                var html = this.template({
                    loading_text: loadingText,
                    container_class: containerClassName
                });

                this.$el.html(html);
                return this;
            }

        });

    }
);
