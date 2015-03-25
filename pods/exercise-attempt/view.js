define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/model',
		'text!pods/exercise-attempt/templates/modal.html',
		'text!pods/exercise-attempt/templates/exerciseRecap.html',
		'text!pods/exercise-attempt/templates/exerciseRecapFooter.html',

		'pods/exercise-attempt/question-answer/models/question',
		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/views/form',
		'pods/exercise-attempt/question-answer/views/feedback',

		'less!pods/exercise-attempt/style',
	],
	function($, _, Backbone, Config,
		ExerciseAttemptModel, modalTemplate, recapTemplate, recapFooterTemplate,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel, 
			ExerciseAttemptQuestionAnswerFormView, ExerciseAttemptQuestionAnswerFeedbackView
		) {

		return Backbone.View.extend({

			model: ExerciseAttemptModel,

			tagName: 'div',

			template: _.template(modalTemplate),
			recapTemplate: _.template(recapTemplate),
			
			render: function() {
				var resourceModelJSON = this.resource.forTemplate();
				// FIXME: factorize iconUrl addition
				switch (resourceModelJSON.resource_content._cls) {
					case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.RICH_TEXT;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
					case Config.stringsDict.RESOURCE_TYPE.VIDEO:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.VIDEO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.EXERCISE;
						break;
					case Config.stringsDict.RESOURCE_TYPE.AUDIO:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.AUDIO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.DOWNLOADABLE_FILE;
						break;
				}
				var html = this.template({
					attempt: this.model.forTemplate(),
					resource: resourceModelJSON,
					config: Config
				});
				this.$el.html(html);
				this.$el.find('.exercise-attempt-form').hide();
				this.$el.find('.exercise-attempt-question-answer-feedback').hide();
				this.$el.find('.exercise-attempt-footer').hide();

				this.continueExercise();

				return this;
			},

			events: {
				'submit form': 'submitAnswer',
				'click .btn-continue': 'continueExercise',
			},

			updateCurrentQuestionAnswer: function() {
				this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
			},

			renderProgressBar: function() {
				var width = (100 * this.model.getProgress()).toFixed(2);
				this.$el.find('.progress-bar')
					.attr('aria-valuenow', this.model.getNumberOfQuestionsAnswered())
					.css('width', width + '%');
			},

			renderCurrentQuestionAnswerForm: function() {
				var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
				this.listenTo(formView, 'onAnswerRadioSelected', function () {
					console.log("onAnswerRadioSelected");
					this.$el.find('.exercise-attempt-form button').removeClass('disabled');
				});
				formView.render();

				this.$el.find('#current_question_id_input').val(this.currentQuestionAnswer.get('question_id'));
				this.$el.find('.exercise-attempt-question').html(formView.$el);
				if (this.currentQuestionAnswer.questionModel().get('_cls') == 'UniqueAnswerMCQExerciseQuestion')
				{
					this.$el.find('.exercise-attempt-form button').addClass('disabled');
				}
				this.$el.find('.exercise-attempt-form').show();

				this.$el.find('.exercise-attempt-question-answer-feedback').empty().hide();

				this.$el.find('.exercise-attempt-question-answer-result').empty();
				this.$el.find('.exercise-attempt-footer').hide();
			
				return this;
			},

			renderFeedbackAndResult: function(questionId) {
				var currentQuestionAnswer = this.model.getQuestionAnswer(questionId);
				
				var feedbackView = ExerciseAttemptQuestionAnswerFeedbackView.initialize(currentQuestionAnswer);
				feedbackView.render();
				
				var $result = $('<p></p>').html('?');
				if (currentQuestionAnswer.get('is_answered_correctly') === true) {
					$result.html(Config.stringsDict.EXERCISES.RIGHT_ANSWER);
					$result.addClass('text-success');
				}
				else if (currentQuestionAnswer.get('is_answered_correctly') === false) {
					$result.html(Config.stringsDict.EXERCISES.WRONG_ANSWER);
					$result.addClass('text-danger');
				}

				this.$el.find('.exercise-attempt-form').hide();

				this.$el.find('.exercise-attempt-question-answer-feedback').html(feedbackView.$el).show();

				this.$el.find('.exercise-attempt-question-answer-result').html($result);
				this.$el.find('.exercise-attempt-footer').show();
			},

			submitAnswer: function(e) {
				e.preventDefault(); // Prevents from submitting the form
				
				var formData = this.$el.find('form').serialize();
				var questionId = this.currentQuestionAnswer.get('question_id');
				var self = this;
				$.ajax({
						type: 'POST',
						url: this.model.postAnswerUrl(), 
						data: formData,
						dataType: 'json'
					}).done(function(result){
						self.model = new ExerciseAttemptModel(result, {parse: true});
						self.renderProgressBar();
						self.renderFeedbackAndResult(questionId);
					}).fail(function(error){
						console.log("Could not submit answer", error);
					});

				return false; // Also prevents from submitting the form
				              // Not sure if useful
			},

			renderEndOfExercise: function() {

				// FIXME: use real templates

				var html = this.recapTemplate({
					attempt: this.model.forRecapTemplate(),
				});

				this.$el.find('.modal-body').html(html);
				this.$el.find('.exercise-attempt-footer').html(recapFooterTemplate).show();

			},

			continueExercise: function() {
				this.updateCurrentQuestionAnswer();
				this.renderProgressBar();
				if (this.currentQuestionAnswer != null) {
					this.renderCurrentQuestionAnswerForm();
				} else {
					this.renderEndOfExercise();
				}
			},

		});
		
	}
);
