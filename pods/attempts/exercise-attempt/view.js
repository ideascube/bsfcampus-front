define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

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
		'pods/resource/views/button-link-to-resource',

		'less!pods/attempts/exercise-attempt/style.less'
	],
	function($, _, Backbone, Config,
		ExerciseAttemptModel,
	 	modalTemplate, progressQuestionIconTemplate, recapTemplate, recapFooterTemplate,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel, 
		ExerciseAttemptQuestionAnswerFormView, ExerciseAttemptQuestionAnswerFeedbackView,
		ResourceModel, FailLinkedResourceView
		) {

		return Backbone.View.extend({

			model: ExerciseAttemptModel,

			tagName: 'div',

			isQuestionVerified: false,

            isExerciseCompleted: false,

			template: _.template(modalTemplate),
            progressQuestionIconTemplate: _.template(progressQuestionIconTemplate),
			recapTemplate: _.template(recapTemplate),
			recapFooterTemplate: _.template(recapFooterTemplate),

            render: function() {
				var resourceSON = this.resource.forTemplate();
                var html = this.template({
					attempt: this.model.forTemplate(),
					resource: resourceSON,
					config: Config
				});
				this.$el.html(html);
				this.$el.find('.exercise-attempt-form').hide();
				this.$el.find('.exercise-attempt-question-answer-feedback').hide();

				return this;
			},

			events: {
				'click .btn-continue': 'nextStep'
			},

			updateCurrentQuestionAnswer: function() {
				this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
			},

            renderProgression: function() {
                var questionsCollection = this.model.getCollection();
                var $progress = this.$el.find('.exercise-attempt-progress');
                var $table = $progress.find('.question-icon-table');
                $table.html('');

                var progressWidth = $progress.width();
                console.log("renderProgression : progressWidth =", progressWidth);
                var singleWidth = Math.floor(progressWidth/(this.model.getNumberOfQuestions()*2));
                var singleMarginRightLeft = Math.floor(singleWidth / 4);

                for (var i=0; i < questionsCollection.length; i++)
                {
                    var questionAnswer = questionsCollection.models[i];
                    var question = questionAnswer.get('question');
                    var successStatus = "";
                    if (question != null)
                    {
                        var givenAnswer = questionAnswer.get('given_answer');
                        if (givenAnswer != null)
                        {
                            // the question has been answered
                            var isCorrect = questionAnswer.get('is_answered_correctly');
                            successStatus = isCorrect ? "success" : "fail";
                        }
                        else
                        {
                            // the question has been asked but not answered yet
                        }
                    }
                    else
                    {
                        // The question has not been asked yet
                    }
                    var questionIconHtml = this.progressQuestionIconTemplate({successStatus: successStatus, config: Config});
                    var $questionHtml = $(questionIconHtml);
                    $questionHtml.css("width", singleWidth);
                    $questionHtml.css("height", singleWidth);
                    //$questionHtml.css("margin", "auto " + singleMarginRightLeft + "px");
                    $table.append($questionHtml);
                }
            },

            renderObjective: function() {
                var objectiveMessage = Config.stringsDict.EXERCISES.OBJECTIVE_MESSAGE;
                var maxMistakes = this.model.get('max_mistakes');
                objectiveMessage = objectiveMessage.replace("[%NB_SUCCESS_MIN%]", "" + (this.model.getNumberOfQuestions() - maxMistakes));
                this.$el.find(".exercise-objective").html(objectiveMessage);
            },

			renderCurrentQuestionAnswerForm: function() {
				var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
				this.listenTo(formView, 'onAnswerRadioSelected', function () {
					this.$el.find('.exercise-attempt-footer button').removeClass('disabled');
				});
				this.listenTo(formView, 'onDropdownSelected', function (dropdownId, propositionId) {
					this.currentQuestionAnswer.setDropdownSelection(dropdownId, propositionId);
					if (this.currentQuestionAnswer.areAllDropdownsSelected())
					{
						this.$el.find('.exercise-attempt-footer button').removeClass('disabled');
					}
				});
				this.listenTo(formView, 'onOrderingSortableItemReceived', function () {
					if (this.$el.find('#ordering-items-source').children().length == 0)
					{
						this.$el.find('.exercise-attempt-footer button').removeClass('disabled');
					}
					else if (!this.$el.find('.exercise-attempt-footer button').hasClass('disabled'))
					{
						this.$el.find('.exercise-attempt-footer button').addClass('disabled');
					}
				});
				this.listenTo(formView, 'onCategorizerSortableItemReceived', function () {
					if (this.$el.find('#categorizer-items-source').children().length == 0)
					{
						this.$el.find('.exercise-attempt-footer button').removeClass('disabled');
					}
					else if (!this.$el.find('.exercise-attempt-footer button').hasClass('disabled'))
					{
						this.$el.find('.exercise-attempt-footer button').addClass('disabled');
					}
				});
				formView.render();

				this.$el.find('#current_question_id_input').val(this.currentQuestionAnswer.get('question_id'));
				this.$el.find('.exercise-attempt-question').html(formView.$el);
				if (this.currentQuestionAnswer.questionModel().get('_cls') == 'UniqueAnswerMCQExerciseQuestion'
					|| this.currentQuestionAnswer.questionModel().get('_cls') == 'DropdownExerciseQuestion'
					|| this.currentQuestionAnswer.questionModel().get('_cls') == 'OrderingExerciseQuestion'
					|| this.currentQuestionAnswer.questionModel().get('_cls') == 'CategorizeExerciseQuestion')
				{
					this.$el.find('.exercise-attempt-footer button').addClass('disabled');
				}
				this.$el.find('.exercise-attempt-form').show();

				this.$el.find('.answer-explanation').empty().hide();

				this.$el.find('.exercise-attempt-question-answer-feedback').empty().hide();

				this.$el.find('.exercise-attempt-question-answer-result').empty();
			
				return this;
			},

			renderFeedbackAndResult: function(questionId) {
				var currentQuestionAnswer = this.model.getQuestionAnswer(questionId);
				
				var feedbackView = ExerciseAttemptQuestionAnswerFeedbackView.initialize(currentQuestionAnswer);
				feedbackView.render();

				var answerExplanationEl = this.$el.find('.answer-explanation');
				answerExplanationEl.removeClass('right-answer').removeClass('wrong-answer');
				if (currentQuestionAnswer.get('is_answered_correctly') === true)
				{
					answerExplanationEl.addClass('right-answer');
				}
				else
				{
					answerExplanationEl.addClass('wrong-answer');
				}
				console.log(currentQuestionAnswer);
				if (currentQuestionAnswer.get('question').answer_feedback != null)
				{
					answerExplanationEl.html(currentQuestionAnswer.get('question').answer_feedback);
					answerExplanationEl.show();
				}
				else
				{
					answerExplanationEl.html('');
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

				this.$el.find('.exercise-attempt-form').hide();

				this.$el.find('.exercise-attempt-question-answer-feedback').html(feedbackView.$el).show();

				this.$el.find('.exercise-attempt-question-answer-result').html($result);
			},

			answerReceived: function(result){
				var questionId = this.currentQuestionAnswer.get('question_id');
				this.model = new ExerciseAttemptModel(result, {parse: true});
				this.renderProgression();
				this.renderObjective();
				this.renderFeedbackAndResult(questionId);
				// we enable the continue button until we get the response
				this.$el.find('.btn-continue').removeClass('disabled');
			},

			onAnswerError: function(error){
				console.log("Could not submit answer", error);
			},

			submitAnswer: function() {

                console.log('submitAnswer');
                var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
				var formData = formView.serializeForm();
				// we disable the continue button until we get the response
				this.$el.find('.btn-continue').addClass('disabled');

				var self = this;
				$.ajax({
						type: 'POST',
						url: this.model.postAnswerUrl(), 
						data: formData,
						dataType: 'json'
					})
					.done(function(result) {
						self.answerReceived(result);
					})
					.fail(function(error) {
						self.onAnswerError(error);
					});

				return false; // Also prevents from submitting the form
				              // Not sure if useful
			},

			renderEndOfExercise: function() {
				var recapModelJSON = this.model.forRecapTemplate();
				var html = this.recapTemplate({
					attempt: recapModelJSON,
					config: Config
				});

				this.$el.find('.modal-body').html(html);
				var $exerciseRecap = this.$el.find('.modal-body .exercise-recap');
				var $exerciseRecapDetails = $exerciseRecap.find('.recap-details');
				if (recapModelJSON.number_mistakes <= recapModelJSON.max_mistakes)
				{
                    this.isExerciseCompleted = true;
					$exerciseRecap.addClass('exercise-succeeded');
					$exerciseRecap.find('.recap-header h1').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE_HEADER);
					$exerciseRecapDetails.find('p').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE);
					$exerciseRecapDetails.append('<img src="' + Config.imagesDict.greenCheck + '">');
				}
				else
				{
                    this.isExerciseCompleted = false;
					$exerciseRecap.addClass('exercise-failed');
					$exerciseRecap.find('.recap-header h1').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE_HEADER);
					$exerciseRecapDetails.find('p').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE);
					
					if (this.model.getFailedLinkedResource() != null)
					{
						var resourceModel = new ResourceModel(this.model.getFailedLinkedResource());
						var failLinkedResourceView = new FailLinkedResourceView({model: resourceModel});
						failLinkedResourceView.render();
						failLinkedResourceView.$el.bind("click", this.closeModal);
						$exerciseRecapDetails.append(failLinkedResourceView.$el);
					}
					else
					{
						$exerciseRecapDetails.append('<img src="' + Config.imagesDict.wrongRed + '">');
					}
				}
				console.log("renderEndOfExercise", recapModelJSON);
				this.renderProgression();
				this.renderObjective();
				html = this.recapFooterTemplate({
					config:Config
				});
				this.$el.find('.exercise-attempt-footer').html(html);

			},

			nextStep: function() {
				if (this.isQuestionVerified)
				{
					this.$el.find('.exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.VALIDATE);
					this.continueExercise();
				}
				else
				{
					this.$el.find('.exercise-attempt-footer button').html(Config.stringsDict.EXERCISES.CONTINUE);
					this.submitAnswer();
				}
				this.isQuestionVerified = !this.isQuestionVerified;
			},

			continueExercise: function() {
				this.updateCurrentQuestionAnswer();
				this.renderProgression();
				this.renderObjective();
				if (this.currentQuestionAnswer != null && this.model.getNumberOfMistakesMade() <= this.model.get('max_mistakes')) {
					this.renderCurrentQuestionAnswerForm();
				} else {
					this.renderEndOfExercise();
				}
			},

            closeModal: function() {
                $('#modal-container').modal('hide');
			}

		});
		
	}
);
