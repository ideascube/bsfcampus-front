define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/exercise-attempt/question-answer/unique-answer-mcq/views/form',
		'pods/exercise-attempt/question-answer/multiple-answer-mcq/views/form',
	],
	function($, _, Backbone, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView
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
				}
				return ret;
			},

		};
		
	}
);
