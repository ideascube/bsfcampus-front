/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/resource/model',

        'pods/resource/views/lessonOutlineItem',

        'text!pods/user/profile/pages/templates/dashboard-skill-item.html'
    ],
    function($, _, Backbone, Config,
             ResourceModel,
             DashboardSkillResourceItemView,
             skillItemTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(skillItemTemplate),

            render: function() {
                var modelSON = this.model.forTemplate();
                modelSON.validationClass = (modelSON.is_validated) ? "validated" : "";
                var html = this.template({skill: modelSON, config: Config});
                this.$el.html(html);

                var self = this;
                _.each(this.model.get('lessons'), function(lesson) {
                    _.each(lesson.resources, self.renderResource, self);
                });

                return this;
            },

            renderResource: function(resource) {
                var skillResourceItemView = new DashboardSkillResourceItemView({model: new ResourceModel({resource: resource}, {parse: true})});
                skillResourceItemView.render();
                this.$el.find('.dashboard-skill-resources').append(skillResourceItemView.$el);
            }

        });

    }
);
