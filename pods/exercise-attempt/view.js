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
				this.renderCurrentQuestion();
			},

			events: {
				'submit form': 'submitAnswer',
			},

			renderCurrentQuestion: function() {
				var question_answers = this.model.get('question_answers');
				for (var i = 0; i < question_answers.length; i++) {
					if (question_answers[i].question != null) {
						var questionModel = new ExerciseAttemptQuestionModel(question_answers[i].question);
						this.renderQuestion(questionModel);
						return;
					}
				}
			},

			renderQuestion: function(questionModel) {
				var questionView = new ExerciseAttemptQuestionView({model: questionModel});
				questionView.render();
				this.$el.find('.exercise-attempt-footer').addClass('hidden');
				this.$el.find('.exercise-attempt-question-answer-feedback').addClass('hidden');
				this.$el.find('.exercise-attempt-form').removeClass('hidden');
				this.$el.find('.exercise-attempt-question').html(questionView.$el);
				this.$el.find('#current_question_id_input').val(questionModel.id);
			},

			submitAnswer: function(e) {
				e.preventDefault();
				console.log("Tried to submit answer");
				var formData = this.$el.find('form').serialize();
				console.log(formData);
				$.ajax({
						type: 'POST',
						url: this.model.postAnswerUrl(), 
						data: formData,
						dataType: 'json'
					}).done(function(result){
						console.log(result);
					}).fail(function(error){
						console.log(error);
					});
				return false;
			}

		});
		
	}
);
