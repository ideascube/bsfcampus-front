define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',
        'videojs',

        'pods/resource/content/baseView',

        'pods/analytics/models/watchedVideoResource',

        'text!pods/resource/content/video/templates/local.html',
        'text!pods/resource/content/video/templates/youtube.html'
    ],
    function ($, _, Backbone, Config, videojs,
              ResourceContentBaseView,
              WatchedVideoResourceAnalyticsModel,
              localTemplate, youtubeTemplate) {

        return ResourceContentBaseView.extend({

            template: function(args) {
                var source = (Config.constants.server_type == "local") ? "local" : this.model.get('resource_content').source;
                switch(source) {
                    case 'youtube':
                        return _.template(youtubeTemplate)(args);
                    default:
                        return _.template(localTemplate)(args);
                }
            },

            activateAfterRendered: function() {
                ResourceContentBaseView.prototype.activateAfterRendered.apply(this, arguments);

                var self = this;
                var source = (Config.constants.server_type == "local") ? "local" : this.model.get('resource_content').source;

                switch(source) {
                    case 'youtube':
                        window.onYouTubeIframeAPIReady = function() {
                            self.youtubePlayer = new YT.Player('youtube-video', {
                                height: '100%',
                                width: '100%',
                                videoId: self.model.get('resource_content').video_id,
                                events: {
                                    'onStateChange': function(e) {
                                        self.youtubePlayerStateChanged(e);
                                    }
                                }
                            });
                        };
                        setTimeout(window.onYouTubeIframeAPIReady, 500);
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
            },

            youtubePlayerStateChanged: function(e) {
                if (e.data === 0) {
                    this.completeResource();
                }
            },

            close: function() {
                delete window.onYouTubeIframeAPIReady;
                delete self.youtubePlayer;
            }


        });

    }
);
