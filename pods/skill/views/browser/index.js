define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'resourcesCollection',

        'pods/skill/views/browser/skillHierarchy',
        'pods/resource/views/panel',

        'text!pods/skill/templates/browser/index.html',

        'less!pods/skill/styles/browser'
    ],
    function ($, _, Backbone, VM, Config,
              resourcesCollection,
              SkillHierarchyView, ResourcePanelView,
              browserTemplate) {

        return Backbone.View.extend({

            className: 'skill-detail row gutter-sm',

            events: {
                'click #skill-hierarchy a.resource': 'clickedResource'
            },

            currentResource: null,

            render: function () {
                this.$el.html(browserTemplate);
                this.$skillHierarchy = this.$('#skill-hierarchy');
                this.$resourcePanel = this.$('#resource-panel');

                this.renderHierarchy();

                if (this.currentResource) {
                    this.selectResource(this.currentResource);
                }

                return this;
            },

            renderHierarchy: function() {
                var skillHierarchyView = new SkillHierarchyView({model: this.model});
                skillHierarchyView.listenTo(this, 'selectedResource', skillHierarchyView.unfoldToResource);
                this.$skillHierarchy.html(skillHierarchyView.render().$el);

                return this;
            },

            clickedResource: function(e) {
                e.preventDefault();
                var $anchor = $(e.currentTarget);
                var resource;
                if ($anchor.length && (resource = $anchor.data('resource'))) {
                    var app = require('app/main');
                    app.router.navigate($anchor.attr('href'), {trigger: false});
                    this.selectResource(resource);
                }
            },

            selectResource: function(resource) {
                resource = resourcesCollection.getOrInstantiate(resource);
                var resourcePanelView = new ResourcePanelView({
                    model: resource
                });
                this.$resourcePanel.html(resourcePanelView.render().$el);
                this.trigger('selectedResource', resource);
                this.currentResource = resource;
            }

        });

    }
);
