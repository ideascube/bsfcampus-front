define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/resource/model',

        'text!pods/user/profile/pages/templates/dashboard-skill-item.html',
        'text!pods/skill/templates/validation-badge.html',
        'text!pods/user/profile/pages/templates/dashboard-resource.html'
    ],
    function ($, _, Backbone, Config,
              ResourceModel,
              skillItemTemplate, badgeHTML, resourceTemplate) {

        return Backbone.View.extend({

            className: 'panel panel-default skill-resources-block',

            template: _.template(skillItemTemplate),
            resourceTemplate: _.template(resourceTemplate),

            initialize: function(options){
                this.skill = options.skill;
            },

            skillAnalytics: function () {
                var skillInfo = this.model.get('courses_info').get('skills')[this.skill.id];
                var analytics = skillInfo.analytics;
                var averageTime = null;
                if (analytics.average_time_on_exercise > 0)
                {
                    averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                }
                var lastAttempt = (analytics.last_attempts_scores.length > 0)
                    ? analytics.last_attempts_scores[0]
                    : null;
                return {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visits),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                };
            },

            render: function () {
                var html = this.template({
                    skill: this.skill.toJSON(true),
                    analytics: this.skillAnalytics(),
                    config: Config
                });
                this.$el.html(html);

                if (this.skill.isValidated()) {
                    this.$el.addClass('skill-validated');
                    this.$('.skill-title').append(badgeHTML);
                    this.$('.progress-bar')
                        .removeClass('progress-bar-success')
                        .addClass('progress-bar-info golden-effect');
                }

                var self = this;
                var lessons = this.skill.get('lessons');
                lessons.fetchIfNeeded().done(function(){
                    lessons.each(function (lesson) {
                        var resources = lesson.get('resources');
                        resources.fetchIfNeeded().done(function(){
                            resources.each(self.renderResource, self);
                        });
                    }, self);
                });


                return this;
            },

            resourceAnalytics: function(resource) {
                var resourceInfo = this.model.get('courses_info').get('resources')[resource.id];
                var analytics = resourceInfo.analytics;
                var averageTime = null;
                if (analytics.average_time_on_exercise > 0)
                {
                    averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                }
                analytics.last_attempts_scores || (analytics.last_attempts_scores = []);
                var lastAttempt = (analytics.last_attempts_scores.length > 0)
                    ? analytics.last_attempts_scores[0]
                    : null;
                return {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visits),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                };
            },

            renderResource: function (resource) {
                var html = this.resourceTemplate({
                    config: Config,
                    resource: resource.toJSON(true),
                    analytics: this.resourceAnalytics(resource)
                });
                this.$('.dashboard-skill-resources').append(html);
            },

            // This is a helper function to help display a duration (in seconds) in string format
            durationToMMSS: function (duration) {
                var minutes = Math.floor(duration / 60);
                var seconds = duration - (minutes * 60);

                if (seconds < 10 && minutes > 0) { seconds = "0" + seconds; }
                var time = (minutes > 0) ? minutes + 'm et ' : '';
                time += seconds + 's';
                return time;
            }

        });

    }
);
