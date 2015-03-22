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
			},

			events: {
				'click .btn-continue': 'continueExercise',
			},

			continueExercise: function(e) {
				e.preventDefault();
				var self = this;
				$.get(this.model.nextQuestionUrl(), function(result) {
					var parsedModel = new ExerciseAttemptQuestionModel().parse(result);
					var questionModel = new ExerciseAttemptQuestionModel(parsedModel);
					var questionView = new ExerciseAttemptQuestionView({model: questionModel});
					questionView.render();
					self.$el.find('.exercise-attempt-question').html(questionView.$el);
				}, 'json');
			}

		});
		
	}
);
