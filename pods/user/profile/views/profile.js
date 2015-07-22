define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'pods/user/models/current',
        'pods/user/models/dashboard',

        'pods/user/profile/views/navMenu',
        'pods/user/profile/pages/views/account',
        'pods/user/profile/pages/views/dashboard',
        'pods/user/profile/pages/views/password',
        'pods/user/profile/pages/views/parameters',
        'pods/user/profile/pages/views/tutoring',

        'text!pods/user/profile/templates/profile.html',

        'less!pods/user/profile/styles/profile'
    ],
    function($, _, Backbone, Config,
             currentUser, DashboardModel,
             NavMenuView, AccountView, DashboardView, PasswordView, ParametersView, TutoringView,
             profileTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: "user-profile",

            template: _.template(profileTemplate),

            navMenuView: null,

            render: function() {
                var html = this.template({resource: this.model.forTemplate()});
                this.$el.html(html);

                this.renderNavMenu();
                this.navMenuView.changeSelectedPage(Config.constants.userProfile.DASHBOARD);
            },

            renderNavMenu: function() {
                this.navMenuView = new NavMenuView();
                this.navMenuView.render();
                this.listenTo(this.navMenuView, 'onRenderNavContentPage', this.renderNavContent);
                this.$el.find('#profile-nav-menu').html(this.navMenuView.$el);
            },

            renderNavContent: function(pageId) {

                var profileDetailPageView;
                switch (pageId)
                {
                    case Config.constants.userProfile.DASHBOARD:
                        var dashboardUserModel = new DashboardModel({_id: currentUser.id});
                        profileDetailPageView = new DashboardView({model: dashboardUserModel});
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
                    case Config.constants.userProfile.TUTORING:
                        profileDetailPageView = new TutoringView();
                        break;
                    default:
                        return;
                }
                profileDetailPageView.render();
                this.$el.find('#profile-nav-details').html(profileDetailPageView.$el);
            }

        });

    }
);
