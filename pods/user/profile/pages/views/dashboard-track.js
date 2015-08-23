define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/profile/pages/templates/dashboard-track-computer-item.html',
        'text!pods/user/profile/pages/templates/dashboard-track-tablet-item.html'
    ],
    function ($, _, Backbone, Config,
              computerTemplate, tabletTemplate) {

        return Backbone.View.extend({

            className: 'track media',
            tagName: 'a',

            computerTemplate: _.template(computerTemplate),
            tabletTemplate: _.template(tabletTemplate),
            template: function(){
                if (this.size == 'md-up') {
                    return this.computerTemplate.apply(this, arguments);
                } else if (this.size == 'sm-down') {
                    return this.tabletTemplate.apply(this, arguments);
                }
            },

            initialize: function(options){
                this.track = options.track;
                this.size = options.size;
            },

            trackAnalytics: function () {
                var trackInfo = this.model.get('courses_info').get('tracks')[this.track.id];
                var analytics = trackInfo.analytics;
                var averageTime = null;
                if (analytics.average_time_on_exercise > 0) {
                    averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                }
                var lastAttempt = (analytics.last_attempts_scores.length > 0)
                    ? analytics.last_attempts_scores[0]
                    : null;
                return {
                    nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visits),
                    lastAttempt: lastAttempt,
                    averageTime: averageTime
                }
            },

            render: function () {
                var html = this.template({
                    track: this.track.toJSON(true),
                    analytics: this.trackAnalytics(),
                    config: Config
                });
                this.$el.html(html);
                this.$el.attr('href', this.track.route());
                this.$el.attr('data-track', this.track.id);

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
