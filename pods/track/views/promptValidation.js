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
                var self = this;
                DS.find(Config.constants.dsResourceNames.TRACK, this.trackId).then(function (trackModel) {
                    var html = self.template({track: trackModel.forTemplate(), config: Config});
                    self.$el.html(html);
                });

                return this;
            },

            closeModal: function() {
                $('#modal-container').modal('hide');
            }
        });
    }
);
