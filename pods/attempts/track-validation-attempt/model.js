/**
 * Created by FredFourcade on 17/06/2015.
 */
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

            jsonKey: "track_validation_attempt",

            urlRoot: function() {
                return Config.constants.serverGateway + '/activity/track_validation_attempts';
            }

        });

    }
);