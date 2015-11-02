define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',
        'videojs',

        'pods/resource/content/baseView',

        'pods/analytics/models/watchedVideoResource',

        'text!pods/resource/content/video/template.html',

        'text!pods/resource/content/external-video/templates/youtube.html'
    ],
    function ($, _, Backbone, Config, videojs,
              ResourceContentBaseView,
              WatchedVideoResourceAnalyticsModel,
              template,
              youtubeTemplate) {

        return ResourceContentBaseView.extend({

            template: function(args) {
                switch(this.model.get('resource_content').source) {
                    case 'youtube':
                        return _.template(youtubeTemplate)(args);
                    default:
                        return _.template(template)(args);
                }
            },

            activateAfterRendered: function() {
                ResourceContentBaseView.prototype.activateAfterRendered.apply(this, arguments);

                var self = this;

                switch(this.model.get('resource_content').source) {
                    case 'youtube':
                        break;
                    default:
                        this.videoPlayer = videojs(
                            this.$("video#resource-video-player")[0],
                            {width: "auto", height: "auto"},
                            function(){
                                this.on("ended", function(){
                                    self.completeResource();
                                });
                            }
                        );
                        break;
                }
            },

            completeResource: function () {
                if (!this.model.get("is_validated"))
                {
                    var analytics = new WatchedVideoResourceAnalyticsModel();
                    analytics.set('resource', this.model.id);
                    analytics.save();
                }
            }


        });

    }
);
