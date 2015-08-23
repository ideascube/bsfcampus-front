define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'skillsCollection',

        'pods/skill/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              skillsCollection,
              SkillModel) {

        return AbstractCollection.extend({

            model: SkillModel,

            track: null,

            initialize: function (models, options) {
                options || (options = {});
                this.track = options.track;
            },

            add: function(models, options) {
                var addedModels = skillsCollection.add(models, options);
                return AbstractCollection.prototype.add.call(this, addedModels, options);
            },

            serverPath: function () {
                return '/hierarchy/skills/track/' + this.track.id;
            }

        });

    }
);
