define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/model',
		'text!pods/exercise-attempt/templates/modal.html',
		'text!pods/exercise-attempt/templates/exerciseMistakes.html',
		'text!pods/exercise-attempt/templates/exerciseRecap.html',
		'text!pods/exercise-attempt/templates/exerciseRecapFooter.html',

		'pods/exercise-attempt/question-answer/models/question',
		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/views/form',
		'pods/exercise-attempt/question-answer/views/feedback',

		'less!pods/exercise-attempt/style',
	],
	function($, _, Backbone, Config,
		ExerciseAttemptModel, modalTemplate, mistakesTemplate, recapTemplate, recapFooterTemplate,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel, 
			ExerciseAttemptQuestionAnswerFormView, ExerciseAttemptQuestionAnswerFeedbackView
		) {

		return Backbone.View.extend({

			model: ExerciseAttemptModel,

			tagName: 'div',

			isQuestionVerified: false,

			template: _.template(modalTemplate),
			recapTemplate: _.template(recapTemplate),
			recapFooterTemplate: _.template(recapFooterTemplate),
			
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

				this.continueExercise();

				return this;
			},

			events: {
				'click .btn-continue': 'nextStep',
			},

			updateCurrentQuestionAnswer: function() {
				this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
			},

			renderProgressBar: function() {
				var progress = this.model.getNumberOfQuestionsAnswered() / this.model.getNumberOfQuestions();
				var width = (100 * progress).toFixed(2);
				this.$el.find('.progress-bar')
					.attr('aria-valuenow', this.model.getNumberOfQuestionsAnswered())
					.attr('aria-valuemax', this.model.getNumberOfQuestions())
					.css('width', width + '%');
			},

			renderMistakes: function() {
				var nbMistakesMade = this.model.getNumberOfMistakesMade();
				var maxMistakes = this.model.get('max_mistakes');
				console.log("renderMistakes", nbMistakesMade, maxMistakes);
				var mistakesCounterEl = this.$el.find('.exercise-mistakes-counter');
				mistakesCounterEl.html('');
				for (var i=0; i < Math.min(nbMistakesMade, maxMistakes); i++)
				{
					mistakesCounterEl.append('<img src="' + Config.imagesDict.inkDropOff + '">');
				}
				for (var i=0; i < (maxMistakes - nbMistakesMade); i++)
				{
					mistakesCounterEl.append('<img src="' + Config.imagesDict.inkDropOn + '">');
				}
			},

			renderCurrentQuestionAnswerForm: function() {
				var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
				this.listenTo(formView, 'onAnswerRadioSelected', function () {
					this.$el.find('.exercise-attempt-footer button').removeClass('disabled');
				});
				formView.render();

				this.$el.find('#current_question_id_input').val(this.currentQuestionAnswer.get('question_id'));
				this.$el.find('.exercise-attempt-question').html(formView.$el);
				if (this.currentQuestionAnswer.questionModel().get('_cls') == 'UniqueAnswerMCQExerciseQuestion')
				{
					this.$el.find('.exercise-attempt-footer button').addClass('disabled');
				}
				this.$el.find('.exercise-attempt-form').show();

				this.$el.find('.exercise-attempt-question-answer-feedback').empty().hide();

				this.$el.find('.exercise-attempt-question-answer-result').empty();
			
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
			},

			submitAnswer: function() {

				console.log('submitAnswer');
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
						self.renderMistakes();
						self.renderFeedbackAndResult(questionId);
					}).fail(function(error){
						console.log("Could not submit answer", error);
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
				if (recapModelJSON.number_mistakes <= recapModelJSON.max_mistakes)
				{
					this.$el.find('.modal-body .exercise-recap').addClass('exercise-succeeded');
					this.$el.find('.modal-body .exercise-recap .recap-header h1').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE_HEADER);
					this.$el.find('.modal-body .exercise-recap .recap-details p').html(Config.stringsDict.EXERCISES.SUCCESS_MESSAGE);
					this.$el.find('.modal-body .exercise-recap .recap-details img').attr('src', Config.imagesDict.greenCheck);
				}
				else
				{
					this.$el.find('.modal-body .exercise-recap').addClass('exercise-failed');
					this.$el.find('.modal-body .exercise-recap .recap-header h1').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE_HEADER);
					this.$el.find('.modal-body .exercise-recap .recap-details p').html(Config.stringsDict.EXERCISES.FAILURE_MESSAGE);
					this.$el.find('.modal-body .exercise-recap .recap-details img').attr('src', Config.imagesDict.wrongRed);
				}
				console.log("renderEndOfExercise", recapModelJSON);
				this.renderProgressBar();
				this.renderMistakes();
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
				this.renderProgressBar();
				this.renderMistakes();
				if (this.currentQuestionAnswer != null && this.model.getNumberOfMistakesMade() <= this.model.get('max_mistakes')) {
					this.renderCurrentQuestionAnswerForm();
				} else {
					this.renderEndOfExercise();
				}
			},

		});
		
	}
);
