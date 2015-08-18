define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/views/recap',

        'pods/attempts/skill-validation-attempt/model',

        'text!pods/attempts/skill-validation-attempt/templates/recap-success.html',
        'text!pods/attempts/skill-validation-attempt/templates/recap-fail.html'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptRecapView,
              SkillValidationAttemptModel,
              successTemplate, failTemplate) {

        return ExerciseAttemptRecapView.extend({

            model: SkillValidationAttemptModel,

            successTemplate: _.template(successTemplate),
            failTemplate: _.template(failTemplate),

            handleFailure: function () {
                // Do nothing
            }

        });

    }
);
