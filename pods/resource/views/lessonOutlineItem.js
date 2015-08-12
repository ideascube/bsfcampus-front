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

            initialize: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            template: _.template(lessonOutlineItemTemplate),

            analytics: function () {
                var analytics = this.model.get('analytics');
                if (analytics != null) {
                    var averageTime = null;
                    if (analytics.average_time_on_exercise != null && analytics.average_time_on_exercise > 0)
                    {
                        averageTime = this.durationToMMSS(analytics.average_time_on_exercise);
                    }
                    var lastAttempt = (analytics.last_attempts_scores != null && analytics.last_attempts_scores.length > 0)
                        ? analytics.last_attempts_scores[0]
                        : null;
                    return {
                        nbVisitsMessage: Config.stringsDict.USER.PROFILE.DASHBOARD.ANALYTICS.NB_VISITS.replace("[%NB_VISIT%]", analytics.nb_visit),
                        lastAttempt: lastAttempt,
                        averageTime: averageTime
                    };
                }
                return null;
            },

            render: function () {
                var html = this.template({
                    resource: this.model.forTemplate(),
                    analytics: this.analytics(),
                    config: Config
                });
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
