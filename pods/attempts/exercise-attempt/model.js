define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',
		'pods/resource/model',

		'pods/attempts/exercise-attempt/question-answer/models/question-answer',
		'pods/attempts/exercise-attempt/question-answer/collections/attempt'
	],
	function($, _, Backbone, Config,
		AbstractModel, ResourceModel,
		ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionAnswersCollection
		) {

		return AbstractModel.extend({
			
			forRecapTemplate: function() {
				var son = this.forTemplate();
				son.number_questions = this.getCollection().length;
				son.number_mistakes = this.getNumberOfMistakesMade();
				return son;
			},

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
				var models = this.getCollection().models;
				var nextQuestionUnanswered = _.find(models, function (questionAnswer) {
					return questionAnswer.get('given_answer') == null;
                });
                return nextQuestionUnanswered;
			},

			getQuestionAnswer: function(questionId) {
				return this.getCollection().findWhere({'question_id': questionId});
			},

			getProgress: function() {
				return this.getNumberOfQuestionsAnswered() / this.getCollection().length;
			},

			getNumberOfQuestionsAnswered: function() {
				return _.filter(this.getCollection().models, function(questionAnswer){
					return questionAnswer.get('given_answer') != null;
				}).length;
			},

			getNumberOfQuestions: function() {
				return this.getCollection().length;
			},

			getNumberOfMistakesMade: function() {
				return _.filter(this.getCollection().models, function(questionAnswer){
					return questionAnswer.get('is_answered_correctly') === false;
				}).length;
			},

			getFailedLinkedResource: function() {
				return this.get('fail_linked_resource');
			}

		});

	}
);
