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
                var achievements = new Backbone.Collection(this.recursiveNormalize(response.achievements));
                achievements.each(processAchievement, this);

                return AbstractModel.prototype.parse.call(this, response, options);
            },

            serverPath: '/activity/visited_resource'
        });

    }
);
