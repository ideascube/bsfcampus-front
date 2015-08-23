define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'pods/resource/content/baseView',

        'text!pods/resource/content/exercise/template.html',

        'pods/attempts/exercise-attempt/model',
        'pods/attempts/exercise-attempt/views/modal'
    ],
    function ($, _, Backbone, VM, Config,
              ResourceContentBaseView,
              template,
              ExerciseAttemptModel, ExerciseAttemptModalView) {

        return ResourceContentBaseView.extend({

            events: {
                'click .btn-start-exercise': 'startExercise'
            },

            template: _.template(template),

            renderFetched: function () {
                ResourceContentBaseView.prototype.renderFetched.apply(this, arguments);

                if (this.model.isValidated()) {
                    this.$('.btn-start-exercise').removeClass('btn-success').addClass('btn-info golden-effect');
                }

                return this;
            },

            startExercise: function () {
                var attempt = new ExerciseAttemptModel();
                attempt.set('exercise', this.model.id);
                attempt.save().done(function () {
                    var exerciseAttemptView = VM.createView(Config.constants.VIEWS_ID.EXERCISE_ATTEMPT, function () {
                        return new ExerciseAttemptModalView({model: attempt});
                    });
                    $('body').append(exerciseAttemptView.render().$el);

                    exerciseAttemptView.$el.on('hidden.bs.modal', function () {
                        VM.closeView(Config.constants.VIEWS_ID.EXERCISE_ATTEMPT);
                        if (exerciseAttemptView.promptTrackValidation) {
                            Backbone.history.loadUrl("/prompt_track_validation/" + attempt.track().id);
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
