define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/detail/lessonOutline',

        'text!pods/skill/templates/detail/skill-outline-item.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              LessonOutlineView,
              skillOutlineItemTemplate) {

        return AbstractView.extend({

            className: 'lesson list-group-item container-fluid',

            template: _.template(skillOutlineItemTemplate),

            renderMinimum: function () {
                var html = this.template({
                    lesson: this.model.toJSON(true)
                });
                this.$el.html(html);
                this.$lessonOutline = this.$('.lesson-outline');

                this.renderOutline();

                return this;
            },

            renderOutline: function () {
                var lessonOutlineView = new LessonOutlineView({
                    collection: this.model.get('resources')
                });
                this.$lessonOutline.html(lessonOutlineView.render().$el);

                return this;
            }

        });

    }
);
