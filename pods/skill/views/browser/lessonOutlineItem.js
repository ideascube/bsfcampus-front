define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'text!pods/skill/templates/browser/lesson-outline-item.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              lessonOutlineItemTemplate) {

        return AbstractView.extend({

            tagName: 'a',
            className: 'resource list-group-item media',
            attributes: function () {
                return {
                    'data-resource': this.model.id,
                    href: this.model.route()
                }
            },

            template: _.template(lessonOutlineItemTemplate),

            renderMinimum: function () {
                var html = this.template({resource: this.model.toJSON(true)});
                this.$el.html(html);

                return this;
            }
        });

    }
);
