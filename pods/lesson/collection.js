define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/lesson/model'
    ],
    function($, _, Backbone, Config,
             AbstractCollection,
             LessonModel
    ) {

        return AbstractCollection.extend({

            model: LessonModel,

            dsResourceName: Config.constants.dsResourceNames.LESSON,

            serverPath: '/hierarchy/lessons'

        });

    }
);
