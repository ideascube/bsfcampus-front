define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/resource/content/baseView',

        'text!pods/resource/content/video/template.html',

        'projekktor'
    ],
    function ($, _, Backbone, Config,
              ResourceContentBaseView,
              template) {

        return ResourceContentBaseView.extend({

            template: _.template(template),

            renderFetched: function() {
                ResourceContentBaseView.prototype.renderFetched.apply(this, arguments);

                projekktor('video#resource-video-player', {
                    playerFlashMP4: '../../../lib/StrobeMediaPlayback.swf',
                    playerFlashMP3: '../../../lib/StrobeMediaPlayback.swf'
                });

                return this;
            }

        });

    }
);
