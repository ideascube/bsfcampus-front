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

            serverPath: '/activity/track_validation_attempts'

        });

    }
);