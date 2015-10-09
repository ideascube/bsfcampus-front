define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/views/modal',

        'pods/attempts/skill-validation-attempt/model',
        'pods/attempts/skill-validation-attempt/views/recap',

        'text!pods/attempts/skill-validation-attempt/templates/modal.html'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptModalView,
              SkillValidationAttemptModel, SkillValidationAttemptRecapView,
              modalTemplate) {

        return ExerciseAttemptModalView.extend({

            Model: SkillValidationAttemptModel,
            model: SkillValidationAttemptModel,

            RecapView: SkillValidationAttemptRecapView,

            template: _.template(modalTemplate)

        });

    }
);