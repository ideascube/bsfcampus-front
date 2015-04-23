define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/form',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/form',
		'pods/exercise-attempt/question-answer/right-or-wrong/views/form',
		'pods/exercise-attempt/question-answer/dropdowns/views/form',
		'pods/exercise-attempt/question-answer/ordering/views/form',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView, DropdownView, OrderingView
		) {

		return {

			initialize: function(model, parentView) {
				var ret = null;
				switch (model.questionModel().get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
						ret = new UniqueAnswerMCQView({model: model});
						break;
					case 'MultipleAnswerMCQExerciseQuestion':
						ret = new MultipleAnswerMCQView({model: model});
						break;
					case 'RightOrWrongExerciseQuestion':
						ret = new RightOrWrongView({model: model});
						break;
					case 'DropdownExerciseQuestion':
						ret = new DropdownView({model: model});
						break;
					case 'OrderingExerciseQuestion':
						ret = new OrderingView({model: model});
						break;
				}
				return ret;
			},

		};
		
	}
);
