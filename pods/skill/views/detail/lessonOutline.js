define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/detail/lessonOutlineItem',
        'text!pods/skill/templates/detail/lesson-outline.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              LessonOutlineItemView,
              lessonOutlineTemplate) {

        return AbstractView.extend({

            renderFetched: function () {
                this.$el.html(lessonOutlineTemplate);
                this.$list = this.$('.media-list');
                this.collection.each(this.appendResource, this);

                return this;
            },

            appendResource: function (resource) {
                var lessonOutlineItemView = new LessonOutlineItemView({model: resource});
                this.$list.append(lessonOutlineItemView.render().$el);
            }

        });

    }
);
