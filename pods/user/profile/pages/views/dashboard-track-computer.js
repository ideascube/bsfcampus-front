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

            analytics: function () {
                var analytics = this.model.get('analytics');
                var averageTime = null;
                if (analytics.average_time_on_exercise > 0) {
                    averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                }
                var lastAttempt = (analytics.last_attempts_scores.length > 0)
                    ? analytics.last_attempts_scores[0]
                    : null;
                return {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visit),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                }
            },

            render: function () {
                var html = this.template({
                    track: this.model.toJSON(true),
                    analytics: this.analytics(),
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
