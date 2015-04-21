define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/form',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/form',
		'pods/exercise-attempt/question-answer/right-or-wrong/views/form',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView
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
				}
				return ret;
			},

		};
		
	}
);
