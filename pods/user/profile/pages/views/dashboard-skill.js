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
    function ($, _, Backbone, Config,
              ResourceModel,
              DashboardSkillResourceItemView,
              skillItemTemplate) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(skillItemTemplate),

            generateAnalyticsObject: function (modelSON) {
                var averageTime = null;
                if (modelSON.analytics.average_time_on_exercise > 0)
                {
                    averageTime = this.durationToMMSS(modelSON.analytics.average_time_on_exercise);
                }
                var lastAttempt = (modelSON.analytics.last_attempts_scores.length > 0) ? modelSON.analytics.last_attempts_scores[0] : null;
                var analytics = {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", modelSON.analytics.nb_visit),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                };
                return analytics;
            },

            render: function () {
                var modelSON = this.model.forTemplate();
                modelSON.validationClass = (modelSON.is_validated) ? "validated" : "";
                var html = this.template({skill: modelSON,
                    analytics: this.generateAnalyticsObject(modelSON),
                    config: Config
                });
                this.$el.html(html);

                var self = this;
                _.each(this.model.get('lessons'), function (lesson) {
                    _.each(lesson.resources, self.renderResource, self);
                });

                return this;
            },

            renderResource: function (resource) {
                var skillResourceItemView = new DashboardSkillResourceItemView({model: new ResourceModel({data: resource}, {parse: true})});
                skillResourceItemView.render();
                this.$el.find('.dashboard-skill-resources').append(skillResourceItemView.$el);
            },

            // This is a helper function to help display a duration (in seconds) in string format
            durationToMMSS: function (duration) {
                var minutes = Math.floor(duration / 60);
                var seconds = duration - (minutes * 60);

                if (seconds < 10) {seconds = "0"+seconds;}
                var time = (minutes > 0) ? minutes+'\' ' : '';
                time += seconds+'\"';
                return time;
            }

        });

    }
);
