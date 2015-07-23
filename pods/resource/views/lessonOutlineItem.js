define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/resource/model',
        'text!pods/resource/templates/lesson-outline-item.html'

    ],
    function ($, _, Backbone, Config,
              ResourceModel, lessonOutlineItemTemplate) {

        return Backbone.View.extend({

            model: ResourceModel,

            tagName: 'a',

            className: 'list-group-item media',

            attributes: function () {
                return {
                    'href': this.model.route()
                }
            },

            template: _.template(lessonOutlineItemTemplate),

            generateAnalyticsObject: function (modelSON) {
                var analytics = null;
                if (modelSON.analytics != null) {
                    var averageTime = null;
                    if (modelSON.analytics.average_time_on_exercise != null && modelSON.analytics.average_time_on_exercise > 0)
                    {
                        averageTime = this.durationToMMSS(modelSON.analytics.average_time_on_exercise);
                    }
                    var lastAttempt = (modelSON.analytics.last_attempts_scores != null && modelSON.analytics.last_attempts_scores.length > 0) ? modelSON.analytics.last_attempts_scores[0] : null;
                    analytics = {
                        nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", modelSON.analytics.nb_visit),
                        lastAttempt: lastAttempt,
                        averageTime: averageTime
                    };
                }
                return analytics;
            },

            render: function () {
                var modelSON = this.model.forTemplate();
                var html = this.template({resource: modelSON, analytics: this.generateAnalyticsObject(modelSON), config: Config});
                this.$el.html(html);

                return this;
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
