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
                var trackModel = new TrackModel({_id: this.trackId});
                var self = this;
                trackModel.fetch().done(function () {
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
