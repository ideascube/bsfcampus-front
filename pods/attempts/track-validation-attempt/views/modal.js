define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/track-validation-attempt/model',

        'pods/attempts/exercise-attempt/views/modal',
        'pods/attempts/track-validation-attempt/views/recap',

        'less!pods/attempts/track-validation-attempt/style'
    ],
    function ($, _, Backbone, Config,
              TrackValidationAttemptModel,
              ExerciseAttemptModalView, TrackValidationAttemptRecapView) {

        return ExerciseAttemptModalView.extend({

            className: function () {
                return _.result(ExerciseAttemptModalView.prototype, 'className', '') + ' track-validation';
            },

            Model: TrackValidationAttemptModel,
            model: TrackValidationAttemptModel,

            RecapView: TrackValidationAttemptRecapView

        });

    }
);
