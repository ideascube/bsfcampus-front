define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'view',

        'resourcesCollection',

        'pods/resource/views/panel',
        'pods/resource/views/backToMainResourceNav',

        'text!pods/resource/templates/additional/index.html'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractView,
              resourcesCollection,
              ResourcePanelView,
              BackToMainResourceNavView,
              template) {

        return AbstractView.extend({

            className: 'additional-resource row gutter-sm',

            renderMinimum: function () {
                this.$el.html(template);
                this.$nav = this.$('#additional-resource-nav');
                this.$resourcePanel = this.$('#additional-resource-panel');

                return this;
            },

            renderFetched: function() {

                var resourcePanelView = new ResourcePanelView({
                    model: this.model
                });
                this.$resourcePanel.html(resourcePanelView.render().$el);

                var parentResource = resourcesCollection.getOrInstantiate(this.model.get('parent_resource'));
                var navView = new BackToMainResourceNavView({
                    model: parentResource
                });
                this.$nav.html(navView.render().$el);

            }

        });

    }
);
