define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/skill/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              SkillModel) {

        var SkillsCollection = AbstractCollection.extend({

            model: SkillModel,

            serverPath: '/hierarchy/skills'

        });

        return new SkillsCollection();

    }
);
