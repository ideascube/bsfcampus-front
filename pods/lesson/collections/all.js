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

        var LessonsCollection = AbstractCollection.extend({

            model: LessonModel,

            serverPath: '/hierarchy/lessons',

        });

        return new LessonsCollection();

    }
);
