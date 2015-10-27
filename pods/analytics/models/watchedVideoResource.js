define(
    [
        'jquery',
        'underscore',
        'backbone',

        'model'
    ],
    function ($, _, Backbone,
              AbstractModel) {

        return AbstractModel.extend({
            serverPath: '/activity/watched_video'
        });

    }
);
