define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/model',
		'text!pods/exercise-attempt/template.html',

		'pods/exercise-attempt/question-answer/models/question',
		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/views/form',
		'pods/exercise-attempt/question-answer/views/feedback',
	],
	function($, _, Backbone, Config,
		ExerciseAttemptModel, exerciseAttemptTemplate,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionModel, 
			ExerciseAttemptQuestionAnswerFormView, ExerciseAttemptQuestionAnswerFeedbackView
		) {

		return Backbone.View.extend({

			model: ExerciseAttemptModel,

			tagName: 'div',

			template: _.template(exerciseAttemptTemplate),
			
			render: function() {
				var html = this.template({
					attempt: this.model.forTemplate(),
					resource: this.resource.forTemplate(),
				});
				this.$el.html(html);
				this.$el.find('.exercise-attempt-form').hide();
				this.$el.find('.exercise-attempt-question-answer-feedback').hide();
				this.$el.find('.exercise-attempt-footer').hide();

				this.updateCurrentQuestionAnswer();
				this.renderCurrentQuestionAnswerForm();

				return this;
			},

			events: {
				'submit form': 'submitAnswer',
				'click .btn-continue': 'continueExercise',
			},

			updateCurrentQuestionAnswer: function() {
				this.currentQuestionAnswer = this.model.getCurrentQuestionAnswer();
			},

			renderCurrentQuestionAnswerForm: function() {
				var formView = ExerciseAttemptQuestionAnswerFormView.initialize(this.currentQuestionAnswer);
				formView.render();

				this.$el.find('#current_question_id_input').val(this.currentQuestionAnswer.get('question_id'));
				this.$el.find('.exercise-attempt-question').html(formView.$el);
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
					$result.html('Good answer 😀');
					$result.addClass('text-success');
				}
				else if (currentQuestionAnswer.get('is_answered_correctly') === false) {
					$result.html('Wrong answer 😟');
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
						self.renderFeedbackAndResult(questionId);
					}).fail(function(error){
						console.log("Could not submit answer", error);
					});

				return false; // Also prevents from submitting the form
				              // Not sure if useful
			},

			continueExercise: function() {
				// By default, this.render() renders the first unanswered question.
				// So we just need to refresh the view.
				this.render();
			},

		});
		
	}
);
