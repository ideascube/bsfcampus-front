define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/model',

        'text!pods/attempts/exercise-attempt/templates/recap-success.html',
        'text!pods/attempts/exercise-attempt/templates/recap-fail.html',

        'pods/resource/views/linkToResource'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptModel,
              successTemplate, failTemplate,
              LinkToResourceView) {

        return Backbone.View.extend({

            model: ExerciseAttemptModel,

            successTemplate: _.template(successTemplate),
            failTemplate: _.template(failTemplate),

            render: function () {
                var success = this.model.get('is_validated');

                var templateData = {
                    attempt: this.model.toJSON(),
                    resource: this.model.get('exercise').toJSON(),
                    config: Config
                };

                var html = success
                    ? this.successTemplate(templateData)
                    : this.failTemplate(templateData);
                this.$el.html(html);

                if (!success) {
                    this.handleFailure();
                }

                return this;
            },

            handleFailure: function () {
                var linkedResource = this.model.getFailedLinkedResource();
                if (linkedResource != null) {
                    var failLinkedResourceView = new LinkToResourceView({model: linkedResource});
                    this.$('#fail-linked-resource').html(failLinkedResourceView.render().$el);
                    var self = this;
                    failLinkedResourceView.$el.on('click', function () {
                        self.trigger('close');
                    });
                    this.$('#attempt-result-icon').hide();
                } else {
                    this.$('#fail-linked-resource').hide();
                }
            }

        });

    }
);
