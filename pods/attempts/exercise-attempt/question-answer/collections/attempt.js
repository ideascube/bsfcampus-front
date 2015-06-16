define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
	],
	function($, _, Backbone, Config,
		ExerciseAttemptQuestionAnswerModel
		) {

		return Backbone.Collection.extend({

			model: ExerciseAttemptQuestionAnswerModel

		});

	}
);
