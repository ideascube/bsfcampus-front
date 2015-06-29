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

            urlRoot: function() {
                return Config.constants.serverGateway + '/activity/track_validation_attempts';
            }

        });

    }
);