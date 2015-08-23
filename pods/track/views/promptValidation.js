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

            className: 'modal modal-info fade',

            template: _.template(promptValidationTemplate),

            events: {
                'click .btn-goto-track': 'closeModal'
            },

            render: function () {
                var html = this.template({
                    track: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                return this;
            },

            closeModal: function() {
                this.$el.modal('hide');
            }
        });
    }
);
