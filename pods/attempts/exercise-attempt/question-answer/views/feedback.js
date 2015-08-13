define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/right-or-wrong/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/dropdowns/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/ordering/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/categorizer/views/feedback'
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView, DropdownView, OrderingView, CategorizerView
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
					case 'OrderingExerciseQuestion':
						return new OrderingView({model: model});
					case 'CategorizeExerciseQuestion':
						return new CategorizerView({model: model});
				}
			},

		};
		
	}
);
