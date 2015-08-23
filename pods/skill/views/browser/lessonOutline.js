define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/browser/lessonOutlineItem',

        'app/views/loadingBar'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              LessonOutlineItemView) {

        return AbstractView.extend({

            className: 'list-group',

            renderFetched: function () {
                this.$el.empty();
                this.collection.each(this.appendResource, this);

                return this;
            },

            appendResource: function (resource) {
                var lessonOutlineItemView = new LessonOutlineItemView({model: resource});
                this.$el.append(lessonOutlineItemView.render().$el);
            }

        });

    }
);
