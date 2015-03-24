define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/model',
		'text!pods/exercise-attempt/template.html',

		'pods/exercise-attempt/question/model',
		'pods/exercise-attempt/question/view',
	],
	function($, _, Backbone, Config,
		ExerciseAttemptModel, exerciseAttemptTemplate,
		ExerciseAttemptQuestionModel, ExerciseAttemptQuestionView
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
				this.findCurrentQuestion();
				this.renderCurrentQuestion();

				return this;
			},

			events: {
				'submit form': 'submitAnswer',
				'click .btn-continue': 'continueExercise',
			},

			findCurrentQuestion: function() {
				var question_answers = this.model.get('question_answers');
				for (var i = 0; i < question_answers.length; i++) {
					if (question_answers[i].given_answer == null) {
						this.currentQuestionModel = new ExerciseAttemptQuestionModel(question_answers[i].question);
						return this.currentQuestionModel;
					}
				}
			},

			renderCurrentQuestion: function() {
				var questionView = new ExerciseAttemptQuestionView({model: this.currentQuestionModel});
				questionView.render();

				this.$el.find('#current_question_id_input').val(this.currentQuestionModel.id);
				this.$el.find('.exercise-attempt-question').html(questionView.$el);

				this.$el.find('.exercise-attempt-question-answer-feedback').addClass('hidden');
				this.$el.find('.exercise-attempt-footer').addClass('hidden');
				this.$el.find('.exercise-attempt-form').removeClass('hidden');
			
				return this;
			},

			renderFeedback: function(questionId) {
				console.log("looking for question", questionId);
				var question_answers = this.model.get('question_answers');
				for (var i = 0; i < question_answers.length; i++) {
					if (question_answers[i].question_id == questionId) {
						console.log("Found it!");
						var answered_correctly = question_answers[i].is_answered_correctly;
						console.log("Answer OK?", answered_correctly);
					}
				}
				var resultText = '?';
				if (answered_correctly === true) { resultText = 'Good answer!'; }
				else if (answered_correctly === false) { resultText = 'Wrong answer!'; }
				this.$el.find('.exercise-attempt-question-answer-feedback').html("COUCOU"); // FIXME: Give actual feedback
				this.$el.find('.exercise-attempt-question-answer-result').html(resultText);
				this.$el.find('.exercise-attempt-question-answer-feedback').removeClass('hidden');
				this.$el.find('.exercise-attempt-footer').removeClass('hidden');
				this.$el.find('.exercise-attempt-form').addClass('hidden');
			},

			submitAnswer: function(e) {
				e.preventDefault(); // Prevents from submitting the form
				
				var currentQuestionId = this.currentQuestionModel.id;
				var formData = this.$el.find('form').serialize();
				var self = this;
				$.ajax({
						type: 'POST',
						url: this.model.postAnswerUrl(), 
						data: formData,
						dataType: 'json'
					}).done(function(result){
						var parsedModel = new ExerciseAttemptModel().parse(result);
						self.model = new ExerciseAttemptModel(parsedModel);
						self.renderFeedback(currentQuestionId);
					}).fail(function(error){
						console.log(error);
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
