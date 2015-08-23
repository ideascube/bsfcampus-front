define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/browser/backToSkill',
        'pods/skill/views/browser/skillOutline',

        'text!pods/skill/templates/browser/skill-hierarchy.html'

    ],
    function ($, _, Backbone, Config,
              AbstractView,
              BackToSkillView, SkillOutlineView,
              skillHierarchyTemplate) {

        return AbstractView.extend({

            className: 'panel panel-default',

            template: _.template(skillHierarchyTemplate),

            startListeners: function(){
                // Default behaviour is to listen to model changes.
                // We don't do it here, only the subviews should listen.
            },

            renderMinimum: function () {
                var html = this.template({skill: this.model.toJSON(true)});
                this.$el.html(html);

                this.$skillTitle = this.$('#skill-title');
                this.$skillOutline = this.$('#skill-outline');

                this.renderBackToSkill();
                this.renderOutline();

                return this;
            },

            renderBackToSkill: function() {
                var backToSkillView = new BackToSkillView({model: this.model});
                this.$skillTitle.html(backToSkillView.render().$el);
            },

            renderOutline: function() {
                var skillOutlineView = new SkillOutlineView({collection: this.model.get('lessons')});
                skillOutlineView.listenTo(this, 'selectedResource', skillOutlineView.unfoldToResource);
                this.$skillOutline.html(skillOutlineView.render().$el);
            },

            unfoldToResource: function(resource) {
                this.trigger('selectedResource', resource);
            }

        });

    }
);
