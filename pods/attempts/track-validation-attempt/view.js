/**
 * Created by FredFourcade on 17/06/2015.
 */
define (
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/track-validation-attempt/model',
        'pods/attempts/exercise-attempt/view'
    ],
    function ($, _, Backbone, Config,
              TrackValidationAttemptModel,
              ExerciseAttemptView
    ) {

        return ExerciseAttemptView.extend({

            model: TrackValidationAttemptModel,

            answerReceived: function(result){
                var questionId = this.currentQuestionAnswer.get('question_id');
                this.model = new TrackValidationAttemptModel(result, {parse: true});
                this.renderProgressBar();
                this.renderMistakes();
                this.renderFeedbackAndResult(questionId);
                // we enable the continue button until we get the response
                this.$el.find('.btn-continue').removeClass('disabled');
            }

        });

    }
);