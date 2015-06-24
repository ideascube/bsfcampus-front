/**
 * Created by Fred on 24/06/2015.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'text!pods/user/profile/templates/nav-menu.html',

        'less!pods/user/profile/styles/nav-menu'

    ],
    function($, _, Backbone, Config,
             currentUser, userProfileNavTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            className: 'row',

            id: "user-profile-menu",

            template: _.template(userProfileNavTemplate),

            render: function() {
                var html = this.template({user: currentUser.forTemplate(), config: Config});
                this.$el.html(html);

                return this;
            }

        });

    }
);
