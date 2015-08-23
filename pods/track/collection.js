define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/track/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              TrackModel) {

        var TracksCollection = AbstractCollection.extend({

            model: TrackModel,

            serverPath: '/hierarchy/tracks'

        });

        return new TracksCollection();

    }
);
