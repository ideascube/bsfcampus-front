define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/views/modal',

        'pods/attempts/skill-validation-attempt/model',
        'pods/attempts/skill-validation-attempt/views/recap'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptModalView,
              SkillValidationAttemptModel, SkillValidationAttemptRecapView) {

        return ExerciseAttemptModalView.extend({

            Model: SkillValidationAttemptModel,
            model: SkillValidationAttemptModel,

            RecapView: SkillValidationAttemptRecapView

        });

    }
);