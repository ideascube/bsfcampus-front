define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',
        'videojs',

        'pods/resource/content/baseView',

        'pods/analytics/models/watchedVideoResource',

        'text!pods/resource/content/video/template.html'
    ],
    function ($, _, Backbone, Config, videojs,
              ResourceContentBaseView,
              WatchedVideoResourceAnalyticsModel,
              template) {

        return ResourceContentBaseView.extend({

            template: _.template(template),

            renderFetched: function() {
                ResourceContentBaseView.prototype.renderFetched.apply(this, arguments);

                return this;
            },

            activateAfterRendered: function() {
                ResourceContentBaseView.prototype.activateAfterRendered.apply(this, arguments);

                var self = this;

                this.videoPlayer = videojs(
                    this.$("video#resource-video-player")[0],
                    {width: "auto", height: "auto"},
                    function(){
                        this.on("ended", function(){
                            self.completeResource();
                        });
                    }
                );
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
