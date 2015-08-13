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
                if (result['alert'] != null) {
                    this.handleAlert(result['alert']);
                }

                var questionId = this.currentQuestionAnswer.get('question_id');
                this.model = new SkillValidationAttemptModel(result, {parse: true});
                this.renderProgression();
                this.renderObjective();
                this.renderFeedbackAndResult(questionId);
                // we enable the continue button until we get the response
                this.$('.btn-continue').prop('disabled', false);
            },

            renderEndOfExercise: function() {
                ExerciseAttemptView.prototype.renderEndOfExercise.call(this);

                var recapModelJSON = this.model.forRecapTemplate();

                var $exerciseRecap = this.$('.modal-body .exercise-recap');
                var $exerciseRecapDetails = $exerciseRecap.find('.recap-details');
                if (recapModelJSON.number_mistakes <= recapModelJSON.max_mistakes)
                {
                    this.isExerciseCompleted = true;
                    $exerciseRecap.addClass('exercise-succeeded');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.SKILL_VALIDATION.SUCCESS_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.SKILL_VALIDATION.SUCCESS_MESSAGE);
                }
                else
                {
                    this.isExerciseCompleted = false;
                    $exerciseRecap.addClass('exercise-failed');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.SKILL_VALIDATION.FAILURE_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.SKILL_VALIDATION.FAILURE_MESSAGE);
                }

                $exerciseRecapDetails.find('img').remove();
            }

        });

    }
);