define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/feedback',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/feedback',
		'pods/exercise-attempt/question-answer/right-or-wrong/views/feedback',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView
		) {

		return {

			initialize: function(model) {
				switch (model.questionModel().get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
						return new UniqueAnswerMCQView({model: model});
					case 'MultipleAnswerMCQExerciseQuestion':
						return new MultipleAnswerMCQView({model: model});
					case 'RightOrWrongExerciseQuestion':
						return new RightOrWrongView({model: model});
				}
			},

		};
		
	}
);
