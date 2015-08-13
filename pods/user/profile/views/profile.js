define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'pods/analytics/models/visitedDashboard',

        'pods/user/models/current',
        'pods/user/models/dashboard',

        'pods/user/profile/views/navMenu',
        'pods/user/profile/pages/views/account',
        'pods/user/profile/pages/views/dashboard',
        'pods/user/profile/pages/views/password',
        'pods/user/profile/pages/views/tutoring',

        'text!pods/user/profile/templates/profile.html',

        'less!pods/user/profile/styles/profile'
    ],
    function($, _, Backbone, VM, Config,
             VisitedDashboardAnalyticsModel, currentUser, DashboardModel,
             NavMenuView, AccountView, DashboardView, PasswordView, TutoringView,
             profileTemplate
    ) {

        return Backbone.View.extend({

            id: "user-profile",

            className: "row gutter-sm",

            template: _.template(profileTemplate),

            navMenuView: null,

            render: function() {
                var html = this.template({resource: this.model.forTemplate()});
                this.$el.html(html);

                this.renderNavMenu();
                this.navMenuView.changeSelectedPage(this.page);

                return this;
            },

            renderNavMenu: function() {
                this.navMenuView = VM.createView(Config.constants.VIEWS_ID.USER_PROFILE_NAV_MENU, function() {
                    return new NavMenuView();
                });
                this.$('#profile-nav-menu').html(this.navMenuView.render().$el);
                this.listenTo(this.navMenuView, 'onRenderNavContentPage', this.renderNavContent);
            },

            renderNavContent: function(pageId) {

                var profileDetailPageView;
                switch (pageId)
                {
                    case Config.constants.userProfile.DASHBOARD:
                        var dashboardUserModel = new DashboardModel({_id: currentUser.id});
                        profileDetailPageView = VM.createView(Config.constants.VIEWS_ID.DASHBOARD, function() {
                            return new DashboardView({model: dashboardUserModel});
                        });

                        var analytics = new VisitedDashboardAnalyticsModel();
                        analytics.set('dashboard_user', currentUser.id);
                        analytics.save();
                        break;
                    case Config.constants.userProfile.ACCOUNT:
                        profileDetailPageView = VM.createView(Config.constants.VIEWS_ID.ACCOUNT, function() {
                            return new AccountView();
                        });
                        break;
                    case Config.constants.userProfile.PASSWORD:
                        profileDetailPageView = VM.createView(Config.constants.VIEWS_ID.PASSWORD, function() {
                            return new PasswordView();
                        });
                        break;
                    case Config.constants.userProfile.TUTORING:
                        profileDetailPageView = VM.createView(Config.constants.VIEWS_ID.TUTORING, function() {
                            return new TutoringView();
                        });
                        break;
                    default:
                        return;
                }
                this.$('#profile-nav-details').html(profileDetailPageView.render().$el);
            }

        });

    }
);
