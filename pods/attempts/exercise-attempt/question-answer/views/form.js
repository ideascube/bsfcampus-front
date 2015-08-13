define(
	[
		'jquery',
		'underscore',
		'backbone',
        'viewmanager',
        'app/config',

		'pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/views/form',
		'pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/views/form',
		'pods/attempts/exercise-attempt/question-answer/right-or-wrong/views/form',
		'pods/attempts/exercise-attempt/question-answer/dropdowns/views/form',
		'pods/attempts/exercise-attempt/question-answer/ordering/views/form',
		'pods/attempts/exercise-attempt/question-answer/categorizer/views/form',
	],
	function($, _, Backbone, VM, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView, DropdownView, OrderingView, CategorizerView
		) {

		return {

			initialize: function(model) {
				var rv = null;
				switch (model.questionModel().get('_cls')) {
					case 'UniqueAnswerMCQExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.UNIQUE_ANSWER_MCQ, function() {
                            return new UniqueAnswerMCQView({model: model});
                        });
						break;
					case 'MultipleAnswerMCQExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.MULTIPLE_ANSWER_MCQ, function() {
                            return new MultipleAnswerMCQView({model: model});
                        });
						break;
					case 'RightOrWrongExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.RIGHT_OR_WRONG, function() {
                            return new RightOrWrongView({model: model});
                        });
						break;
					case 'DropdownExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.DROPDOWN, function() {
                            return new DropdownView({model: model});
                        });
						break;
					case 'OrderingExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.ORDERING, function() {
                            return new OrderingView({model: model});
                        });
						break;
					case 'CategorizeExerciseQuestion':
                        rv = VM.reuseView(Config.constants.VIEWS_ID.QUESTIONS.CATEGORIZER, function() {
                            return new CategorizerView({model: model});
                        });
						break;
				}
				return rv;
			}

		};
		
	}
);
