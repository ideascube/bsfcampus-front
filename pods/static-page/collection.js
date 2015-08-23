define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'collection',

        'pods/static-page/model'
    ],
    function ($, _, Backbone, Config,
              AbstractCollection,
              StaticPageModel) {

        var StaticPagesCollection = AbstractCollection.extend({

            model: StaticPageModel,

            serverPath: '/static_page'

        });

        return new StaticPagesCollection();

    }
);
