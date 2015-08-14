define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'collection',
        'model',

        'pods/attempts/exercise-attempt/model',

        'text!pods/attempts/exercise-attempt/templates/modal.html',
        'text!pods/attempts/exercise-attempt/templates/progress-question-icon.html',
        'text!pods/attempts/exercise-attempt/templates/exerciseRecap.html',
        'text!pods/attempts/exercise-attempt/templates/exerciseRecapFooter.html',

        'pods/attempts/exercise-attempt/question-answer/models/question',
        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/views/form',
        'pods/attempts/exercise-attempt/question-answer/views/feedback',

        'pods/resource/model',
        'pods/resource/views/linkToResource',

        'pods/analytics/processAchievement',

        'less!pods/attempts/exercise-attempt/style.less'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractCollection, AbstractModel,
              ExerciseAttemptModel,
              modalTemplate, progressQuestionIconTemplate, recapTemplate, recapFooterTemplate,
              ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel,
              ExerciseAttemptQuestionAnswerFormView, ExerciseAttemptQuestionAnswerFeedbackView,
              ResourceModel, FailLinkedResourceView,
              processAchievement) {

        return Backbone.View.extend({

            className: 'modal fade',

            attributes: {
                'data-backdrop': 'static',
                'data-keyboard': false
            },

            model: ExerciseAttemptModel,

            isQuestionVerified: false,

            isExerciseCompleted: false,

            template: _.template(modalTemplate),
            progressQuestionIconTemplate: _.template(progressQuestionIconTemplate),
            recapTemplate: _.template(recapTemplate),
            recapFooterTemplate: _.template(recapFooterTemplate),

            render: function () {
                var resourceSON = this.resource.forTemplate();
                var html = this.template({
                    attempt: this.model.forTemplate(),
                    resource: resourceSON,
                    config: Config
                });
                this.$el.html(html);
                this.$('.exercise-attempt-form').hide();
                this.$('.exercise-attempt-question-answer-feedback').hide();

                return this;
            },

            events: {
                'click .btn-continue': 'nextStep'
            },

            updateCurrentQuestionAnswer: function () {
                this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
            },

            renderProgression: function () {
                var questionsCollection = this.model.getCollection();
                var $progress = this.$('.exercise-attempt-progress');
                var $table = $progress.find('.question-icon-table');
                $table.empty();

                var progressWidth = $progress.width();
                console.log("renderProgression : progressWidth =", progressWidth);
                var singleWidth = Math.max(Math.min(Math.floor(progressWidth / (this.model.getNumberOfQuestions() * 1.25)), Config.constants.exerciseAttemptProgressionMaxWidth), Config.constants.exerciseAttemptProgressionMinWidth);
                var marginLeftRight = Math.floor(singleWidth / 8);

                for (var i = 0; i < questionsCollection.length; i++) {
                    var questionAnswer = questionsCollection.models[i];
                    var question = questionAnswer.get('question');
                    var successStatus = "";
                    if (question != null) {
                        var givenAnswer = questionAnswer.get('given_answer');
                        if (givenAnswer != null) {
                            // the question has been answered
                            var isCorrect = questionAnswer.get('is_answered_correctly');
                            successStatus = isCorrect ? "success" : "fail";
                        }
                        else {
                            // the question has been asked but not answered yet
                        }
                    }
                    else {
                        // The question has not been asked yet
                    }
                    var questionIconHtml = this.progressQuestionIconTemplate({
                        successStatus: successStatus,
                        config: Config
                    });
                    var $questionHtml = $(questionIconHtml);
                    $questionHtml.css("width", singleWidth);
                    $questionHtml.css("height", singleWidth);
                    $questionHtml.css("margin", "auto " + marginLeftRight + "px");
                    $table.append($questionHtml);
                }
            },

            renderObjective: function () {
                var objectiveMessage = Config.stringsDict.EXERCISES.OBJECTIVE_MESSAGE;
                var maxMistakes = this.model.get('max_mistakes');
                objectiveMessage = objectiveMessage.replace("[%NB_SUCCESS_MIN%]", "" + (this.model.getNumberOfQuestions() - maxMistakes));
                this.$(".exercise-objective").html(objectiveMessage);
            },

            renderCurrentQuestionAnswerForm: function () {
                this.renderProgression();
                this.renderObjective();
                var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
                this.listenTo(formView, 'onAnswerRadioSelected', function () {
                    this.$('.exercise-attempt-footer button').prop('disabled', false);
                });
                this.listenTo(formView, 'onDropdownSelected', function (dropdownId, propositionId) {
                    this.currentQuestionAnswer.setDropdownSelection(dropdownId, propositionId);
                    if (this.currentQuestionAnswer.areAllDropdownsSelected()) {
                        this.$('.exercise-attempt-footer button').prop('disabled', false);
                    }
                });
                this.listenTo(formView, 'onOrderingSortableItemReceived', function () {
                    if (this.$('#ordering-items-source').children().length == 0) {
                        this.$('.exercise-attempt-footer button').prop('disabled', false);
                    }
                    else {
                        this.$('.exercise-attempt-footer button').prop('disabled', true);
                    }
                });
                this.listenTo(formView, 'onCategorizerSortableItemReceived', function () {
                    if (this.$('#categorizer-items-source').children().length == 0) {
                        this.$('.exercise-attempt-footer button').prop('disabled', false);
                    }
                    else {
                        this.$('.exercise-attempt-footer button').prop('disabled', true);
                    }
                });

                this.$('#current_question_id_input').val(this.currentQuestionAnswer.get('question_id'));
                this.$('.exercise-attempt-question').html(formView.render().$el);
                if (this.currentQuestionAnswer.questionModel().get('_cls') == 'UniqueAnswerMCQExerciseQuestion'
                    || this.currentQuestionAnswer.questionModel().get('_cls') == 'DropdownExerciseQuestion'
                    || this.currentQuestionAnswer.questionModel().get('_cls') == 'OrderingExerciseQuestion'
                    || this.currentQuestionAnswer.questionModel().get('_cls') == 'CategorizeExerciseQuestion') {
                    this.$('.exercise-attempt-footer button').prop('disabled', true);
                }
                this.$('.exercise-attempt-form').show();

                this.$('.answer-explanation').empty().hide();

                this.$('.exercise-attempt-question-answer-feedback').empty().hide();

                this.$('.exercise-attempt-question-answer-result').empty();

                return this;
            },

            renderFeedbackAndResult: function (questionId) {
                var currentQuestionAnswer = this.model.getQuestionAnswer(questionId);

                var feedbackView = ExerciseAttemptQuestionAnswerFeedbackView.initialize(currentQuestionAnswer);

                var answerExplanationEl = this.$('.answer-explanation');
                answerExplanationEl.removeClass('right-answer').removeClass('wrong-answer');
                if (currentQuestionAnswer.get('is_answered_correctly') === true) {
                    answerExplanationEl.addClass('right-answer');
                }
                else {
                    answerExplanationEl.addClass('wrong-answer');
                }
                console.log(currentQuestionAnswer);
                if (currentQuestionAnswer.get('question').answer_feedback != null) {
                    answerExplanationEl.html(currentQuestionAnswer.get('question').answer_feedback);
                    answerExplanationEl.show();
                }
                else {
                    answerExplanationEl.empty();
                }

                var $result = $('<p></p>').html('?');
                if (currentQuestionAnswer.get('is_answered_correctly') === true) {
                    $result.html(Config.stringsDict.EXERCISES.RIGHT_ANSWER);
                    $result.addClass('text-success');
                }
                else if (currentQuestionAnswer.get('is_answered_correctly') === false) {
                    switch (currentQuestionAnswer.questionModel().get('_cls')) {
                        case 'UniqueAnswerMCQExerciseQuestion':
                        case 'RightOrWrongExerciseQuestion':
                        case 'DropdownExerciseQuestion':
                        case 'OrderingExerciseQuestion':
                        case 'CategorizeExerciseQuestion':
                            $result.html(Config.stringsDict.EXERCISES.WRONG_ANSWER_SINGLE);
                            break;
                        case 'MultipleAnswerMCQExerciseQuestion':
                            $result.html(Config.stringsDict.EXERCISES.WRONG_ANSWER_MULTI);
                            break;
                    }
                    $result.addClass('text-danger');
                }

                this.$('.exercise-attempt-form').hide();

                this.$('.exercise-attempt-question-answer-feedback').html(feedbackView.render().$el).show();

                this.$('.exercise-attempt-question-answer-result').html($result);
            },

            answerReceived: function (result) {
                var questionId = this.currentQuestionAnswer.get('question_id');
                this.model = new ExerciseAttemptModel(result, {parse: true});
                if (this.model.achievements != null) {
                    this.model.achievements.each(function (achievement) {
                        processAchievement(achievement);
                        if (achievement.get('_cls').split('.').pop() == 'UnlockedTrackTest') {
                            this.trackValidationId = achievement.get('track')._id;
                        }
                    }, this);
                }

                this.renderProgression();
                this.renderObjective();
                this.renderFeedbackAndResult(questionId);

                this.$('.btn-continue').prop('disabled', false);
            },

            onAnswerError: function (error) {
                console.log("Could not submit answer", error);
            },

            submitAnswer: function () {

                var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
                var formData = formView.serializeForm();
                // we disable the continue button until we get the response
                this.$('.btn-continue').prop('disabled', true);

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: this.model.postAnswerUrl(),
                    data: formData,
                    dataType: 'json'
                }).done(function (result) {
                    self.answerReceived(result);
                }).fail(function (error) {
                    self.onAnswerError(error);
                });

                return false; // Also prevents from submitting the form
                              // Not sure if useful
            },

            submitStartNextQuestion: function () {

                console.log('submitStartNextQuestion');
                var formData = {form_data: JSON.stringify({question_id: this.currentQuestionAnswer.get('question_id')})};

                $.ajax({
                    type: 'POST',
                    url: this.model.postStartNextQuestionUrl(),
                    data: formData,
                    dataType: 'json'
                });

                return false; // Also prevents from submitting the form
                              // Not sure if useful
            },

            renderEndOfExercise: function () {
                var recapModelJSON = this.model.forRecapTemplate();
                var html = this.recapTemplate({
                    attempt: recapModelJSON,
                    config: Config
                });

                var self = this;

                this.$('.modal-body').html(html);
                var $exerciseRecap = this.$('.modal-body .exercise-recap');
                var $exerciseRecapDetails = $exerciseRecap.find('.recap-details');
                if (recapModelJSON.number_mistakes <= recapModelJSON.max_mistakes) {
                    this.isExerciseCompleted = true;
                    $exerciseRecap.addClass('exercise-succeeded');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE);
                    $exerciseRecapDetails.append('<img src="' + Config.imagesDict.greenCheck + '">');
                }
                else {
                    this.isExerciseCompleted = false;
                    $exerciseRecap.addClass('exercise-failed');
                    $exerciseRecap.find('.recap-header h1').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE_HEADER);
                    $exerciseRecapDetails.find('p').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE);

                    if (this.model.getFailedLinkedResource() != null) {
                        var resourceModel = new ResourceModel(this.model.getFailedLinkedResource());
                        var failLinkedResourceView = new FailLinkedResourceView({model: resourceModel});
                        $exerciseRecapDetails.append(failLinkedResourceView.render().$el);
                        failLinkedResourceView.$el.bind("click", function(){
                            self.trigger('close');
                        });
                    }
                    else {
                        $exerciseRecapDetails.append('<img src="' + Config.imagesDict.wrongRed + '">');
                    }
                }
                this.renderProgression();
                this.renderObjective();
                html = this.recapFooterTemplate({
                    config: Config
                });
                this.$('.exercise-attempt-footer').html(html);

            },

            nextStep: function () {
                if (this.isQuestionVerified) {
                    this.$('.exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.VALIDATE);
                    this.continueExercise();
                }
                else {
                    this.$('.exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.CONTINUE);
                    this.submitAnswer();
                }
                this.isQuestionVerified = !this.isQuestionVerified;
            },

            continueExercise: function () {
                this.updateCurrentQuestionAnswer();
                if (this.currentQuestionAnswer != null && this.model.getNumberOfMistakesMade() <= this.model.get('max_mistakes')) {
                    this.submitStartNextQuestion();
                    this.renderCurrentQuestionAnswerForm();
                } else {
                    this.renderEndOfExercise();
                }
            }

        });

    }
);
