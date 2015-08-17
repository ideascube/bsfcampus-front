define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',

		'pods/attempts/exercise-attempt/question-answer/models/question',
	],
	function($, _, Backbone, Config,
		AbstractModel,
		ExerciseAttemptQuestionModel
		) {

		return AbstractModel.extend({
			
			currentQuestionModel: null,

			questionModel: function() {
				if (this.currentQuestionModel == null && this.get('question')) {
					this.currentQuestionModel = new ExerciseAttemptQuestionModel(this.get('question'));
				}
				return this.currentQuestionModel;
			}

		});

	}
);
