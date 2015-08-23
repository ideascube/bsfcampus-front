define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'lessonsCollection',

        'pods/lesson/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              lessonsCollection,
              LessonModel) {

        return AbstractCollection.extend({

            model: LessonModel,

            skill: null,

            initialize: function (models, options) {
                options || (options = {});
                this.skill = options.skill;
            },

            add: function (models, options) {
                var addedModels = lessonsCollection.add(models, options);
                return AbstractCollection.prototype.add.call(this, addedModels, options);
            },

            serverPath: function () {
                return '/hierarchy/lessons/skill/' + this.skill.id;
            }

        });

    }
);
