define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'resourcesCollection',

        'pods/resource/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              resourcesCollection,
              ResourceModel) {

        return AbstractCollection.extend({

            model: ResourceModel,

            lesson: null,

            initialize: function (models, options) {
                options || (options = {});
                this.lesson = options.lesson;
            },

            add: function(models, options) {
                var addedModels = resourcesCollection.add(models, options);
                return AbstractCollection.prototype.add.call(this, addedModels, options);
            },

            serverPath: function () {
                return '/resources/lesson/' + this.lesson.id;
            }

        });

    }
);
