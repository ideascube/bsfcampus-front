define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/resource/model'
    ],
    function($, _, Backbone, Config,
             AbstractCollection,
             ResourceModel
    ) {

        var ResourcesCollection = AbstractCollection.extend({

            model: ResourceModel,

            serverPath: '/resources'

        });

        return new ResourcesCollection();

    }
);
