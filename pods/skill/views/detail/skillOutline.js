define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/detail/skillOutlineItem',
        'text!pods/skill/templates/detail/skill-outline.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              SkillOutlineItemView, skillOutlineTemplate) {

        return AbstractView.extend({

            renderFetched: function () {
                this.$el.html(skillOutlineTemplate);
                this.$list = this.$('.list-group');
                this.collection.each(this.appendLesson, this);

                return this;
            },

            appendLesson: function (lesson) {
                var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
                this.$list.append(skillOutlineItemView.render().$el);
            }

        });

    }
);
