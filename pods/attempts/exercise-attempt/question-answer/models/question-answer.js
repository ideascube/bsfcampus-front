define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'pods/attempts/exercise-attempt/question-answer/models/question',
    ],
    function ($, _, Backbone, Config,
              AbstractModel,
              ExerciseAttemptQuestionModel) {

        return AbstractModel.extend({

            parse: function (response) {
                response = AbstractModel.prototype.parse.apply(this, arguments);

                if (response.question) {
                    response.question = new ExerciseAttemptQuestionModel(response.question);
                }

                return response;
            },

            currentQuestionModel: null,

        });

    }
);
