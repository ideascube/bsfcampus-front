define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/attempts/exercise-attempt/question-answer/models/question-answer'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              ExerciseAttemptQuestionAnswerModel) {

        return AbstractCollection.extend({

            model: ExerciseAttemptQuestionAnswerModel

        });

    }
);
