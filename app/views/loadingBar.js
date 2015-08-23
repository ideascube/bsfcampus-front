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
            templateData: {},

            initialize: function(options) {
                options || (options = {});

                this.templateData['loading_text'] = options.loadingText || Config.stringsDict.LOADING;
                this.templateData['container_class'] = options.containerClassName || 'col-xs-12';
            },

            render: function () {
                var html = this.template(this.templateData);

                this.$el.html(html);
                return this;
            }

        });

    }
);
