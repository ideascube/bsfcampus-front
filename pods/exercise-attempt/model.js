define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',

		'pods/exercise-attempt/question-answer/models/question-answer',
		'pods/exercise-attempt/question-answer/collections/attempt',
	],
	function($, _, Backbone, Config,
		AbstractModel,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionAnswersCollection
		) {

		return AbstractModel.extend({
			
			jsonKey: "exercise_attempt",

			getCollection: function() {
				if (this.collection == null) {
					// Lazy instantiation
					var questionAnswers = this.get('question_answers');
					var questionAnswersCollection = new ExerciseAttemptQuestionAnswersCollection();
					for (var i = 0; i < questionAnswers.length; i++) {
						questionAnswersCollection.push(new ExerciseAttemptQuestionAnswerModel(questionAnswers[i]));
					}
					this.collection = questionAnswersCollection;
				}

				return this.collection;
			},
			
			urlRoot: function() {
				return Config.constants.serverGateway + '/activity/exercise_attempts';
			},

			postAnswerUrl: function() {
				return this.url() + '/answer';
			},

			getCurrentQuestionAnswer: function() {
				return _.find(this.getCollection().models, function(questionAnswer) {
					return questionAnswer.get('given_answer') == null;
				});
			},

			getQuestionAnswer: function(questionId) {
				return this.getCollection().findWhere({'question_id': questionId});
			},

		});

	}
);
