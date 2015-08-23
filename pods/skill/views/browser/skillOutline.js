define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/browser/skillOutlineItem',

        'app/views/loadingBar'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              SkillOutlineItemView) {

        return AbstractView.extend({

            className: 'panel-group',
            id: 'hierarchy-accordion',
            attributes: {
                role: "tablist"
            },

            renderFetched: function () {
                this.$el.empty();
                this.collection.each(this.appendLesson, this);

                return this;
            },

            appendLesson: function (lesson) {
                var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
                skillOutlineItemView.listenTo(this, 'selectedResource', skillOutlineItemView.toggleCollapse);
                this.$el.append(skillOutlineItemView.render().$el);
            },

            unfoldToResource: function(resource) {
                this.trigger('selectedResource', resource);
            }

        });

    }
);
