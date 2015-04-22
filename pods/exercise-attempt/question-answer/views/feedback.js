define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/feedback',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/feedback',
		'pods/exercise-attempt/question-answer/right-or-wrong/views/feedback',
		'pods/exercise-attempt/question-answer/dropdowns/views/feedback',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView, DropdownView
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
					case 'DropdownExerciseQuestion':
						return new DropdownView({model: model});
				}
			},

		};
		
	}
);
