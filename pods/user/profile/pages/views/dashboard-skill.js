define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/resource/model',

        'pods/resource/views/lessonOutlineItem',

        'text!pods/user/profile/pages/templates/dashboard-skill-item.html',
        'text!pods/skill/templates/validation-badge.html'
    ],
    function ($, _, Backbone, Config,
              ResourceModel,
              DashboardSkillResourceItemView,
              skillItemTemplate, badgeHTML) {

        return Backbone.View.extend({

            className: 'panel panel-default skill-resources-block',

            template: _.template(skillItemTemplate),

            analytics: function () {
                var analytics = this.model.get('analytics');
                var averageTime = null;
                if (analytics.average_time_on_exercise > 0)
                {
                    averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                }
                var lastAttempt = (analytics.last_attempts_scores.length > 0)
                    ? analytics.last_attempts_scores[0]
                    : null;
                return {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visit),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                };
            },

            render: function () {
                var html = this.template({
                    skill: this.model.forTemplate(),
                    analytics: this.analytics(),
                    config: Config
                });
                this.$el.html(html);

                if (this.model.isValidated()) {
                    this.$el.addClass('skill-validated');
                    this.$('.skill-title').append(badgeHTML);
                    this.$('.progress-bar')
                        .removeClass('progress-bar-success')
                        .addClass('progress-bar-info golden-effect');
                }

                _.each(this.model.get('lessons'), function (lesson) {
                    _.each(lesson.resources, this.renderResource, this);
                }, this);

                return this;
            },

            renderResource: function (resource) {
                var skillResourceItemView = new DashboardSkillResourceItemView({
                    model: new ResourceModel({data: resource}, {parse: true})
                });
                this.$('.dashboard-skill-resources').append(skillResourceItemView.render().$el);
            },

            // This is a helper function to help display a duration (in seconds) in string format
            durationToMMSS: function (duration) {
                var minutes = Math.floor(duration / 60);
                var seconds = duration - (minutes * 60);

                if (seconds < 10) {seconds = "0"+seconds;}
                var time = (minutes > 0) ? minutes+'m et ' : '';
                time += seconds+'s';
                return time;
            }

        });

    }
);
