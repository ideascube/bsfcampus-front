define(
    [
        'jquery',
        'underscore',
        'backbone',

        'model',

        'pods/analytics/processAchievement'
    ],
    function ($, _, Backbone,
              AbstractModel,
              processAchievement) {

        return AbstractModel.extend({

            parse: function(response, options) {
                response = AbstractModel.prototype.parse.call(this, response, options);

                if (this.achievements != null) {
                    this.achievements.each(processAchievement)
                }

                return response;
            },

            serverPath: '/activity/visited_resource'
        });

    }
);
