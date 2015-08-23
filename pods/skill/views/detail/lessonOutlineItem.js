define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'text!pods/skill/templates/detail/lesson-outline-item.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              lessonOutlineItemTemplate) {

        return AbstractView.extend({

            className: 'resource row',

            template: _.template(lessonOutlineItemTemplate),

            renderMinimum: function () {
                var html = this.template({resource: this.model.toJSON(true)});
                this.$el.html(html);

                return this;
            }
        });

    }
);
