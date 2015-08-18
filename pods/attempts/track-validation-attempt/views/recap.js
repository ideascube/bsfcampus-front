define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/views/recap',

        'pods/attempts/track-validation-attempt/model',

        'text!pods/attempts/track-validation-attempt/templates/recap-success.html',
        'text!pods/attempts/track-validation-attempt/templates/recap-fail.html'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptRecapView,
              TrackValidationAttemptModel,
              successTemplate, failTemplate) {

        return ExerciseAttemptRecapView.extend({

            model: TrackValidationAttemptModel,

            successTemplate: _.template(successTemplate),
            failTemplate: _.template(failTemplate),

            handleFailure: function () {
                // Do nothing
            }

        });

    }
);
