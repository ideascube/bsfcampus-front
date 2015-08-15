define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',
        'projekktor',

        'text!pods/resource/content/video/template.html'
    ],
    function ($, _, Backbone, VM, Config, Projekktor,
              template) {

        return Backbone.View.extend({

            template: _.template(template),

            render: function () {
                var html = this.template({
                    resource: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);


                projekktor('video#resource-video-player', {
                    /* path to the MP4 Flash-player fallback component */
                    playerFlashMP4: '../../../lib/StrobeMediaPlayback.swf',

                    /* path to the MP3 Flash-player fallback component */
                    playerFlashMP3: '../../../lib/StrobeMediaPlayback.swf'
                });

                return this;
            }

        });

    }
);
