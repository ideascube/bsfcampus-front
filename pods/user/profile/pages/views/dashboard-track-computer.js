define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/profile/pages/templates/dashboard-track-computer-item.html'
    ],
    function ($, _, Backbone, Config,
              trackItemTemplate) {

        return Backbone.View.extend({

            tagName: 'a',

            className: 'track media',

            attributes: function () {
                return {
                    href: this.model.route(),
                    'data-track': this.model.id
                }
            },

            template: _.template(trackItemTemplate),

            generateAnalyticsObject: function (modelSON) {
                var averageTime = null;
                if (modelSON.analytics.average_time_on_exercise > 0) {
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
                var html = this.template({
                    track: modelSON,
                    analytics: this.generateAnalyticsObject(modelSON),
                    index: this.index,
                    config: Config
                });
                this.$el.html(html);

                return this;
            },

            // This is a helper function to help display a duration (in seconds) in string format
            durationToMMSS: function (duration) {
                var minutes = Math.floor(duration / 60);
                var seconds = duration - (minutes * 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                var time = (minutes > 0) ? minutes + '\' ' : '';
                time += seconds + '\"';
                return time;
            }

        });

    }
);
