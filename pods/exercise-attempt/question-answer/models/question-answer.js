define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',

		'pods/exercise-attempt/question-answer/models/question',
	],
	function($, _, Backbone, Config,
		AbstractModel,
		ExerciseAttemptQuestionModel
		) {

		return AbstractModel.extend({
			
			jsonKey: "questionAnswer",

			questionModel: function() {
				if (this.get('question')) {
					return new ExerciseAttemptQuestionModel(this.get('question'));
				}
			},

		});

	}
);
