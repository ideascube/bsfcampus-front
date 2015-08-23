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
    function ($, _, Backbone, Config,
              AbstractModel, ResourceModel,
              ExerciseAttemptQuestionAnswerModel, ExerciseAttemptQuestionAnswersCollection) {

        return AbstractModel.extend({

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.exercise) {
                    var resourcesCollection = require('resourcesCollection');
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
            },

            getFailedLinkedResource: function () {
                var ref = this.get('fail_linked_resource');
                if (ref == null) {
                    return null;
                }
                return new ResourceModel(ref);
            }

        });

    }
);
