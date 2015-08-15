define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'text!pods/resource/content/exercise/template.html',

        'pods/attempts/exercise-attempt/model',
        'pods/attempts/exercise-attempt/view'
    ],
    function ($, _, Backbone, VM, Config,
              template,
              ExerciseAttemptModel, ExerciseAttemptView) {

        return Backbone.View.extend({

            events: {
                'click .btn-start-exercise': 'startExercise'
            },

            template: _.template(template),

            render: function () {
                var html = this.template({
                    resource: this.model.forTemplate(),
                    config: Config
                });
                this.$el.html(html);

                if (this.model.isValidated()) {
                    this.$('.btn-start-exercise').removeClass('btn-success').addClass('btn-info golden-effect');
                }

                return this;
            },

            startExercise: function () {
                var self = this;

                var attempt = new ExerciseAttemptModel();
                attempt.set('exercise', this.model.id);
                attempt.save().done(function (result) {
                    var exerciseAttemptView = VM.createView(Config.constants.VIEWS_ID.EXERCISE_ATTEMPT, function () {
                        return new ExerciseAttemptView({model: attempt});
                    });
                    exerciseAttemptView.resource = self.model;
                    $('body').append(exerciseAttemptView.render().$el);

                    exerciseAttemptView.$el.on('hidden.bs.modal', function () {
                        VM.closeView(Config.constants.VIEWS_ID.EXERCISE_ATTEMPT);
                        if (exerciseAttemptView.trackValidationId != null) {
                            Backbone.history.loadUrl("/prompt_track_validation/" + exerciseAttemptView.trackValidationId);
                        }
                    }).on('shown.bs.modal', function () {
                        exerciseAttemptView.continueExercise();
                    }).modal('show');
                }).fail(function (error) {

                });
            }

        });

    }
);
