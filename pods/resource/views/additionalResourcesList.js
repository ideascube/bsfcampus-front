define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'pods/skill/views/browser/lessonOutlineItem',

        'text!pods/resource/templates/additional-resources.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              LessonOutlineItemView,
              listTemplate) {

        return AbstractView.extend({

            template: _.template(listTemplate),

            renderMinimum: function(){
                var html = this.template({
                    config: Config
                });
                this.$el.html(html);
                this.$list = this.$('.list-group');
                this.collection.each(this.appendResource, this);

                return this;
            },

            appendResource: function (resource) {
                // FIXME Use a specific view instead of recycling this one.
                var additionalResourcesView = new LessonOutlineItemView({model: resource});
                this.$list.append(additionalResourcesView.render().$el);
            }

        });

    }
);
