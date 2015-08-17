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
        'pods/attempts/exercise-attempt/question-answer/views/question',

        'pods/resource/model',
        'pods/resource/views/linkToResource',

        'less!pods/attempts/exercise-attempt/style.less'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractCollection, AbstractModel,
              ExerciseAttemptModel,
              modalTemplate, progressQuestionIconTemplate, recapTemplate, recapFooterTemplate,
              ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel,
              ExerciseAttemptQuestionAnswerView,
              ResourceModel, FailLinkedResourceView) {

        return Backbone.View.extend({

            className: 'modal fade',

            attributes: {
                'data-backdrop': 'static',
                'data-keyboard': 'false'
            },

            model: ExerciseAttemptModel,

            isQuestionVerified: false,

            isExerciseCompleted: false,

            template: _.template(modalTemplate),
            progressQuestionIconTemplate: _.template(progressQuestionIconTemplate),
            recapTemplate: _.template(recapTemplate),
            recapFooterTemplate: _.template(recapFooterTemplate),

            render: function () {
                var objectiveMessage = Config.stringsDict.EXERCISES.OBJECTIVE_MESSAGE;
                var maxMistakes = this.model.get('max_mistakes');
                objectiveMessage = objectiveMessage.replace("[%NB_SUCCESS_MIN%]", (this.model.getNumberOfQuestions() - maxMistakes).toString());

                var html = this.template({
                    attempt: this.model.toJSON(true),
                    resource: this.resource.toJSON(true),
                    objectiveMessage: objectiveMessage,
                    config: Config
                });
                this.$el.html(html);

                this.$modalBody = this.$('.modal-body');
                this.$result = this.$('#exercise-attempt-question-answer-result');
                this.$progress = this.$('#exercise-attempt-progress');
                this.$questionIconsTable = this.$progress.find('#question-icons-table');
                this.$question = this.$('#exercise-attempt-question');
                this.$btnContinue = this.$('.btn-continue');

                return this;
            },

            events: {
                'submit form': 'nextStep'
            },

            renderProgression: function () {
                var questionsCollection = this.model.getCollection();
                this.$questionIconsTable.empty();

                var progressWidth = this.$progress.width();
                var singleWidth = Math.max(Math.min(Math.floor(progressWidth / (this.model.getNumberOfQuestions() * 1.25)), Config.constants.exerciseAttemptProgressionMaxWidth), Config.constants.exerciseAttemptProgressionMinWidth);
                var marginLeftRight = Math.floor(singleWidth / 8);

                questionsCollection.each(function (questionAnswer) {
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

                this.$result.removeClass('text-success text-danger').empty();

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
                this.model = new ExerciseAttemptModel(result, {parse: true});
                if (this.model.achievements != null) {
                    this.model.achievements.each(function (achievement) {
                        if (achievement.get('_cls').split('.').pop() == 'UnlockedTrackTest') {
                            this.trackValidationId = achievement.get('track')._id;
                        }
                    }, this);
                }
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
                var recapModelJSON = this.model.forRecapTemplate();
                var html = this.recapTemplate({
                    attempt: recapModelJSON,
                    config: Config
                });

                var self = this;

                this.$modalBody.html(html);

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
                        failLinkedResourceView.$el.bind("click", function () {
                            self.trigger('close');
                        });
                    }
                    else {
                        $exerciseRecapDetails.append('<img src="' + Config.imagesDict.wrongRed + '">');
                    }
                }

                html = this.recapFooterTemplate({config: Config});
                this.$('#exercise-attempt-footer').html(html);

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
                if (this.isQuestionVerified) {
                    this.$('#exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.VALIDATE);
                    this.continueExercise();
                }
                else {
                    this.$('#exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.CONTINUE);
                    this.submitAnswer();
                }
                this.isQuestionVerified = !this.isQuestionVerified;
                return false;
            }

        });

    }
);
