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

            className: 'modal fade',

            template: _.template(promptValidationTemplate),

            events: {
                'click .btn-validate-track': 'closeModal'
            },

            render: function () {
                var self = this;
                DS.find(Config.constants.dsResourceNames.TRACKS, this.trackId).then(function (trackModel) {
                    var html = self.template({track: trackModel.forTemplate(), config: Config});
                    self.$el.html(html);
                });

                return this;
            },

            closeModal: function() {
                this.$el.modal('hide');
            }
        });
    }
);
