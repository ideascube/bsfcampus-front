define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/attempts/exercise-attempt/model'
    ],
    function ($, _, Backbone, Config,
              ExerciseAttemptModel) {

        return ExerciseAttemptModel.extend({

            parse: function (response) {
                response = ExerciseAttemptModel.prototype.parse.apply(this, arguments);

                if (response.skill) {
                    var skillsCollection = require('skillsCollection');
                    var skill = skillsCollection.getOrInstantiate(response.skill);
                    if (skill.empty) {
                        skill.set(response.skill);
                    }
                    response.skill = skill;
                }

                return response;
            },

            track: function () {
                return this.get('skill').get('track');
            },

            serverPath: '/activity/skill_validation_attempts'

        });

    }
);