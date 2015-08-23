define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'tracksCollection',

        'pods/track/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              tracksCollection,
              TrackModel) {

        return AbstractCollection.extend({

            model: TrackModel,

            dashboard: null,

            initialize: function (models, options) {
                options || (options = {});
                this.dashboard = options.dashboard;
            },

            add: function(models, options) {
                var addedModels = tracksCollection.add(models, options);
                return AbstractCollection.prototype.add.call(this, addedModels, options);
            }

        });

    }
);
