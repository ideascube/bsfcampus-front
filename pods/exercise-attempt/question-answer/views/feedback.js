define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/feedback',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/feedback',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView
		) {

		return {

			initialize: function(model) {
				switch (model.questionModel().get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
						return new UniqueAnswerMCQView({model: model});
					case 'MultipleAnswerMCQExerciseQuestion':
						return new MultipleAnswerMCQView({model: model});
				}
			},

		};
		
	}
);