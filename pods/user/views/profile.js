/**
 * Created by FredFourcade on 11/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/templates/profile.html'
    ],
    function($, _, Backbone, Config,
             currentUser, profileTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            className: 'track-info-container',

            template: _.template(profileTemplate),

            render: function() {
                var userModel = this.model.forTemplate();
                var html = this.template({user: userModel, config: Config});
                this.$el.html(html);

                return this;
            }

        });

    }
);
