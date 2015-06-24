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

        'pods/user/profile/views/navMenu',
        'pods/user/profile/pages/views/account',
        'pods/user/profile/pages/views/dashboard',
        'pods/user/profile/pages/views/password',
        'pods/user/profile/pages/views/parameters',

        'text!pods/user/profile/templates/profile.html',

        'less!pods/user/profile/styles/profile'
    ],
    function($, _, Backbone, Config,
             currentUser,
             NavMenuView, AccountView, DashboardView, PasswordView, ParametersView,
             profileTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: "user-profile",

            template: _.template(profileTemplate),

            render: function() {
                var html = this.template({resource: this.model.forTemplate()});
                this.$el.html(html);

                this.renderNavMenu();
                this.renderNavContent();
            },

            renderNavMenu: function() {

                var navMenuView = new NavMenuView();
                navMenuView.render();
                this.$el.find('#profile-nav-menu').html(navMenuView.$el);
            },

            renderNavContent: function(pageId) {

                var profileDetailPageView;
                switch (pageId)
                {
                    case Config.constants.userProfile.DASHBOARD:
                        profileDetailPageView = new DashboardView();
                        break;
                    case Config.constants.userProfile.ACCOUNT:
                        profileDetailPageView = new AccountView();
                        break;
                    case Config.constants.userProfile.PASSWORD:
                        profileDetailPageView = new PasswordView();
                        break;
                    case Config.constants.userProfile.PARAMETERS:
                        profileDetailPageView = new ParametersView();
                        break;
                    default:
                        profileDetailPageView = new DashboardView();
                }
                profileDetailPageView.render();
                this.$el.find('#profile-nav-details').html(profileDetailPageView.$el);
            }

        });

    }
);
