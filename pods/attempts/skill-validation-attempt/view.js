/**
 * Created by Fred on 16/06/2015.
 */
define (
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/skill-validation-attempt/model',
        'pods/attempts/exercise-attempt/view'
    ],
    function ($, _, Backbone, Config,
              SkillValidationAttemptModel,
              ExerciseAttemptView
    ) {

        return ExerciseAttemptView.extend({

            model: SkillValidationAttemptModel,

            answerReceived: function(result){
                var questionId = this.currentQuestionAnswer.get('question_id');
                this.model = new SkillValidationAttemptModel(result, {parse: true});
                this.renderProgressBar();
                this.renderMistakes();
                this.renderFeedbackAndResult(questionId);
                // we enable the continue button until we get the response
                this.$el.find('.btn-continue').removeClass('disabled');
            }

        });

    }
);