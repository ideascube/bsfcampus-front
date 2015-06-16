/**
 * Created by Fred on 16/06/2015.
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

            jsonKey: "skill_validation_attempt",

            urlRoot: function() {
                return Config.constants.serverGateway + '/activity/skill_validation_attempts';
            }

        });

    }
);