define (
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/model'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptModel
        ) {

        return ExerciseAttemptModel.extend({

            serverPath: '/activity/skill_validation_attempts'

        });

    }
);