define(
	[
		'jquery',
		'underscore',
		'backbone',
        'viewmanager',
		'app/config',

		'pods/attempts/exercise-attempt/question-answer/unique-answer-mcq/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/multiple-answer-mcq/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/right-or-wrong/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/dropdowns/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/ordering/views/feedback',
		'pods/attempts/exercise-attempt/question-answer/categorizer/views/feedback'
	],
	function($, _, Backbone, VM, Config,
		UniqueAnswerMCQView, MultipleAnswerMCQView, RightOrWrongView, DropdownView, OrderingView, CategorizerView
		) {

		return {

			initialize: function(model) {
                var rv = null;
				switch (model.questionModel().get('_cls')) {
                    case 'UniqueAnswerMCQExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.UNIQUE_ANSWER_MCQ, function() {
                            return new UniqueAnswerMCQView({model: model});
                        });
                        break;
					case 'MultipleAnswerMCQExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.MULTIPLE_ANSWER_MCQ, function() {
                            return new MultipleAnswerMCQView({model: model});
                        });
                        break;
					case 'RightOrWrongExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.RIGHT_OR_WRONG, function() {
                            return new RightOrWrongView({model: model});
                        });
                        break;
					case 'DropdownExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.DROPDOWN, function() {
                            return new DropdownView({model: model});
                        });
                        break;
					case 'OrderingExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.ORDERING, function() {
                            return new OrderingView({model: model});
                        });
                        break;
					case 'CategorizeExerciseQuestion':
                        rv = VM.createView(Config.constants.VIEWS_ID.QUESTIONS.CATEGORIZER, function() {
                            return new CategorizerView({model: model});
                        });
                        break;
				}

                return rv;
			},

		};
		
	}
);
