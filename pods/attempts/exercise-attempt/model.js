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
				var son = this.toJSON(true);
				son.number_questions = this.getCollection().length;
				son.number_mistakes = this.getNumberOfMistakesMade();
				return son;
			},

			getCollection: function() {
				if (this.collection == null) {
					this.collection = new ExerciseAttemptQuestionAnswersCollection(this.get('question_answers'));
				}
				return this.collection;
			},
			
			serverPath: '/activity/exercise_attempts',

			postAnswerUrl: function() {
				return this.url() + '/answer';
			},

			postStartNextQuestionUrl: function() {
				return this.url() + '/start_next_question';
			},

            postEndExerciseUrl: function() {
				return this.url() + '/end';
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
