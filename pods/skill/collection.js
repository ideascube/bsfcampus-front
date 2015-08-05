define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/skill/model'
    ],
    function($, _, Backbone, Config,
             AbstractCollection,
             SkillModel
    ) {

        return AbstractCollection.extend({

            model: SkillModel,

            dsResourceName: Config.constants.dsResourceNames.SKILL,

            serverPath: '/hierarchy/skills'

        });

    }
);
