define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',
        'pods/resource/model',
        'resourcesCollection',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer',
        'pods/attempts/exercise-attempt/question-answer/collections/attempt'
    ],
    function ($, _, Backbone, Config,
              AbstractModel, ResourceModel, resourcesCollection,
              ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionAnswersCollection) {

        return AbstractModel.extend({

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.exercise) {
                    var exercise = resourcesCollection.getOrInstantiate(response.exercise);
                    if (exercise.empty) { exercise.set(response.exercise); }
                    response.exercise = exercise;
                }

                if (response.question_answers) {
                    var collection = new ExerciseAttemptQuestionAnswersCollection();
                    _.each(response.question_answers, function(questionAnswer){
                        var model = new ExerciseAttemptQuestionAnswerModel({data: questionAnswer}, {parse: true});
                        collection.add(model);
                    }, this);
                    response.question_answers = collection;
                }

                if (response.fail_linked_resource) {
                    var fail_linked_resource = resourcesCollection.getOrInstantiate(response.fail_linked_resource);
                    if (fail_linked_resource.empty) { fail_linked_resource.set(response.fail_linked_resource); }
                    response.fail_linked_resource = fail_linked_resource;
                }

                return response;
            },

            track: function() {
                return this.get('exercise').track();
            },

            serverPath: '/activity/exercise_attempts',

            postAnswerUrl: function () {
                return this.url() + '/answer';
            },

            postStartNextQuestionUrl: function () {
                return this.url() + '/start_next_question';
            },

            getCurrentQuestionAnswer: function () {
                return this.get('question_answers').find(function (questionAnswer) {
                    return questionAnswer.get('given_answer') == null;
                });
            },

            getQuestionAnswer: function (questionId) {
                return this.get('question_answers').findWhere({'question_id': questionId});
            },

            getProgress: function () {
                return this.getNumberOfQuestionsAnswered() / this.get('question_answers').length;
            },

            getNumberOfQuestionsAnswered: function () {
                return this.get('question_answers').filter(function (questionAnswer) {
                    return questionAnswer.get('given_answer') != null;
                }).length;
            },

            getNumberOfQuestions: function () {
                return this.get('question_answers').length;
            },

            getNumberOfMistakesMade: function () {
                return this.get('question_answers').filter(function (questionAnswer) {
                    return questionAnswer.get('is_answered_correctly') === false;
                }).length;
            }

        });

    }
);
