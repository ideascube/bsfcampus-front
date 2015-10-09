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

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/models/question',

        'pods/attempts/exercise-attempt/question-answer/views/question',

        'pods/attempts/exercise-attempt/views/recap',

        'less!pods/attempts/exercise-attempt/style.less'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractCollection, AbstractModel,
              ExerciseAttemptModel,
              modalTemplate, progressQuestionIconTemplate,
              ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel,
              ExerciseAttemptQuestionAnswerView,
              ExerciseAttemptRecapView) {

        return Backbone.View.extend({

            className: 'modal fade',

            attributes: {
                'data-backdrop': 'static',
                'data-keyboard': 'false'
            },

            Model: ExerciseAttemptModel,
            model: ExerciseAttemptModel,

            RecapView: ExerciseAttemptRecapView,

            isQuestionVerified: false,
            attemptCompleted: false,

            template: _.template(modalTemplate),
            progressQuestionIconTemplate: _.template(progressQuestionIconTemplate),

            initialize: function(){
                var self = this;
                var track = this.model.track();
                if (track) {
                    this.listenTo(track, 'unlockedTest', function(){
                        self.promptTrackValidation = true;
                    });
                }
            },

            render: function () {
                var objectiveMessage = Config.stringsDict.EXERCISES.OBJECTIVE_MESSAGE;
                var maxMistakes = this.model.get('max_mistakes');
                objectiveMessage = objectiveMessage.replace("[%NB_SUCCESS_MIN%]", (this.model.getNumberOfQuestions() - maxMistakes).toString());

                var templateData = {
                    attempt: this.model.toJSON(true),
                    objectiveMessage: objectiveMessage,
                    config: Config
                };

                // FIXME This is not so clean, we should do this in a separate, view-specific method.
                if (this.model.get('exercise')) {
                    templateData.resource = this.model.get('exercise').toJSON(true)
                } else if (this.model.get('skill')) {
                    templateData.skill = this.model.get('skill').toJSON(true)
                }

                var html = this.template(templateData);
                this.$el.html(html);

                this.$result = this.$('#exercise-attempt-question-answer-result');
                this.$progress = this.$('#exercise-attempt-progress');
                this.$questionIconsTable = this.$progress.find('#question-icons-table');
                this.$question = this.$('#exercise-attempt-question');
                this.$recap = this.$('#exercise-attempt-recap');
                this.$btnContinue = this.$('.btn-continue');

                this.$recap.hide();

                return this;
            },

            events: {
                'submit form': 'nextStep'
            },

            renderProgression: function () {
                var questionAnswers = this.model.get('question_answers');
                this.$questionIconsTable.empty();

                var progressWidth = this.$progress.width();
                var singleWidth = Math.max(Math.min(Math.floor(progressWidth / (this.model.getNumberOfQuestions() * 1.25)), Config.constants.exerciseAttemptProgressionMaxWidth), Config.constants.exerciseAttemptProgressionMinWidth);
                var marginLeftRight = Math.floor(singleWidth / 8);

                questionAnswers.each(function (questionAnswer) {
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
                    this.$questionIconsTable.append($questionHtml);
                }, this);
            },

            updateValidationButton: function () {
                var validationAllowed = _.result(this.currentQuestionView.contentView, 'validationAllowed', true);
                this.$btnContinue.prop('disabled', !validationAllowed);
            },

            renderCurrentQuestionAnswerContent: function () {
                this.renderProgression();

                this.currentQuestionView = new ExerciseAttemptQuestionAnswerView({
                    model: this.currentQuestionAnswer,
                    el: this.$question
                });
                this.currentQuestionView.render();

                this.listenTo(this.currentQuestionView.contentView, 'givenAnswerChanged', this.updateValidationButton);
                this.updateValidationButton();

                return this;
            },

            renderFeedbackAndResult: function () {
                var correctAnswer = this.currentQuestionAnswer.get('is_answered_correctly') === true;

                if (correctAnswer) {
                    this.$result
                        .html(Config.stringsDict.EXERCISES.RIGHT_ANSWER)
                        .addClass('text-success');
                }
                else {
                    var failedText = _.result(
                        this.currentQuestionView.contentView,
                        'failedText',
                        Config.stringsDict.EXERCISES.WRONG_ANSWER_SINGLE
                    );
                    this.$result.html(failedText).addClass('text-danger');
                }

                this.currentQuestionView.model = this.currentQuestionAnswer;
                this.currentQuestionView.render();

                this.$btnContinue.prop('disabled', false);
            },

            answerReceived: function (result) {
                this.model = new this.Model(result, {parse: true});
                this.currentQuestionAnswer = this.model.getQuestionAnswer(this.currentQuestionAnswer.get('question_id'));

                this.renderProgression();
                this.renderFeedbackAndResult();
            },

            submitAnswer: function () {
                var formData = this.$('form').serializeObject();
                _.extend(formData, _.result(this.currentQuestionView.contentView, 'serializeForm', {}));
                this.$btnContinue.prop('disabled', true);

                var self = this;
                $.ajax({
                    type: 'POST',
                    url: this.model.postAnswerUrl(),
                    data: {form_data: JSON.stringify(formData)},
                    dataType: 'json'
                }).done(function (result) {
                    self.answerReceived(result);
                }).fail(function (error) {
                    alert(error);
                }).always(function () {
                    self.$btnContinue.prop('disabled', false);
                });
            },

            submitStartNextQuestion: function () {
                var formData = {form_data: JSON.stringify({question_id: this.currentQuestionAnswer.get('question_id')})};

                $.ajax({
                    type: 'POST',
                    url: this.model.postStartNextQuestionUrl(),
                    data: formData,
                    dataType: 'json'
                });
            },

            renderEndOfExercise: function () {
                var recapView = new this.RecapView({model: this.model});
                this.$recap.html(recapView.render().$el);
                this.listenTo(recapView, 'close', this.close);

                this.$question.empty().hide();
                this.$recap.show();

                this.attemptCompleted = true;
                this.$btnContinue.html(Config.stringsDict.EXERCISES.CLOSE);
            },

            continueExercise: function () {
                this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
                if (this.currentQuestionAnswer != null && this.model.getNumberOfMistakesMade() <= this.model.get('max_mistakes')) {
                    this.submitStartNextQuestion();
                    this.renderCurrentQuestionAnswerContent();
                } else {
                    this.renderEndOfExercise();
                }
            },

            nextStep: function (e) {
                e.preventDefault();
                if (this.attemptCompleted) {
                    this.close();
                }
                else {
                    if (this.isQuestionVerified) {
                        this.$btnContinue.html(Config.stringsDict.EXERCISES.VALIDATE);
                        this.$result.removeClass('text-success text-danger').empty();
                        this.continueExercise();
                    }
                    else {
                        this.$btnContinue.html(Config.stringsDict.EXERCISES.CONTINUE);
                        this.submitAnswer();
                    }
                    this.isQuestionVerified = !this.isQuestionVerified;
                }
                return false;
            },

            close: function() {
                this.$el.modal('hide');
            }

        });

    }
);
