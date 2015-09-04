define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',
        'videojs',

        'pods/resource/content/baseView',

        'pods/analytics/models/completedResource',

        'text!pods/resource/content/video/template.html'
    ],
    function ($, _, Backbone, Config, videojs,
              ResourceContentBaseView,
              CompletedResourceAnalyticsModel,
              template) {

        return ResourceContentBaseView.extend({

            template: _.template(template),

            renderFetched: function() {
                ResourceContentBaseView.prototype.renderFetched.apply(this, arguments);

                return this;
            },

            activateAfterRendered: function() {
                ResourceContentBaseView.prototype.activateAfterRendered.apply(this, arguments);

                var videoPlayer = videojs(this.$("video#resource-video-player")[0], {width: "auto", height: "auto"}, function(){
                    // Player (this) is initialized and ready.
                });

                var self = this;
                this.listenTo(videoPlayer, "loadedmetadata", function() {
                    self.listenTo(videoPlayer, "ended", self.completeResource)
                });
            },

            completeResource: function () {
                if (!this.model.get("is_validated"))
                {
                    var analytics = new CompletedResourceAnalyticsModel();
                    analytics.set('resource', this.model.id);
                    analytics.save();
                }
            }


        });

    }
);
