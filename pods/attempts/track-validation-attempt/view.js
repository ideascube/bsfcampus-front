define (
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/track-validation-attempt/model',
        'pods/attempts/exercise-attempt/view',

        'text!pods/attempts/track-validation-attempt/templates/modal.html',
        'text!pods/attempts/track-validation-attempt/templates/trackValidationRecap.html',
        'text!pods/attempts/track-validation-attempt/templates/trackValidationRecapFooter.html',

        'pods/analytics/processAchievement',

        'less!pods/attempts/track-validation-attempt/style'
    ],
    function ($, _, Backbone, Config,
              TrackValidationAttemptModel,
              ExerciseAttemptView,
              modalTemplate, recapTemplate,  recapFooterTemplate,
              processAchievement
    ) {

        return ExerciseAttemptView.extend({

            model: TrackValidationAttemptModel,

            template: _.template(modalTemplate),
            recapTemplate: _.template(recapTemplate),
            recapFooterTemplate: _.template(recapFooterTemplate),

            answerReceived: function(result){
                var questionId = this.currentQuestionAnswer.get('question_id');
                this.model = new TrackValidationAttemptModel(result, {parse: true});
                if (this.model.achievements != null) {
                    this.model.achievements.each(processAchievement);
                }
                this.renderProgression();
                this.renderObjective();
                this.renderFeedbackAndResult(questionId);
                // we enable the continue button once we get the response
                this.$('.btn-continue').prop('disabled', false);
            },

            renderEndOfExercise: function() {
                var recapModelJSON = this.model.forRecapTemplate();
                var html = this.recapTemplate({
                    attempt: recapModelJSON,
                    config: Config
                });

                this.$('.modal-body').html(html);
                var $exerciseRecap = this.$('.modal-body .exercise-recap');
                $exerciseRecap.addClass("track-validation");
                var $exerciseRecapDetails = $exerciseRecap.find('.recap-details');
                if (recapModelJSON.number_mistakes <= recapModelJSON.max_mistakes)
                {
                    this.isExerciseCompleted = true;
                    $exerciseRecap.addClass('track-validation-succeeded');
                    var track = this.resource.toJSON(true);
                    var $trackRecapIcons = $exerciseRecap.find('#track-recap-icons');
                    $trackRecapIcons.append('<img src="' + track.icon_url + '" class="track-icon">');
                    $trackRecapIcons.css('background', 'url(' + Config.imagesDict.trackValidation.STARS + ') no-repeat center center');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.TRACK_VALIDATION.SUCCESS_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.TRACK_VALIDATION.SUCCESS_MESSAGE);
                }
                else
                {
                    this.isExerciseCompleted = false;
                    $exerciseRecap.addClass('track-validation-failed');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE);
                }
                this.renderProgression();
                this.renderObjective();
                html = this.recapFooterTemplate({
                    config:Config
                });
                this.$('.exercise-attempt-footer').html(html);

            }

        });

    }
);