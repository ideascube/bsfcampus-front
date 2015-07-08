define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/track/model',

        'text!pods/track/templates/prompt-validation.html',

        'less!pods/track/styles/prompt-validation'
    ],
    function ($, _, Backbone, $serialize, Config,
              TrackModel,
              promptValidationTemplate) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(promptValidationTemplate),

            render: function () {
                var track = new TrackModel({_id: this.trackId});
                var html = this.template({track: track.forTemplate(), config: Config});
                this.$el.html(html);

                return this;
            },

            closeModal: function() {
                $('#modal-container').modal('hide');
            }
        });
    }
);
