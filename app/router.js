define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'collection',
        'model',

        'tracksCollection',
        'skillsCollection',
        'lessonsCollection',
        'resourcesCollection',
        'pods/static-page/collection',

        'pods/user/models/current',
        'pods/analytics/models/misc',
        'pods/analytics/models/visitedResource',
        'pods/analytics/models/visitedSkill',
        'pods/analytics/models/visitedTrack',

        'app/header/view',
        'app/footer/view',
        'pods/home/view',
        'pods/home-connected/view',
        'pods/user/connection/views/register',
        'pods/user/connection/views/login',
        'pods/user/connection/views/resetPassword',
        'pods/user/profile/views/profile',
        'pods/track/views/list/index',
        'pods/track/views/detail/index',
        'pods/skill/views/detail/index',
        'pods/skill/views/browser/index',
        'pods/breadcrumb/views/breadcrumbContainer',
        'pods/track/views/promptValidation',
        'pods/search/view',
        'pods/static-page/view',

        'less!app/styles/common'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractCollection, AbstractModel,
              tracksCollection, skillsCollection, lessonsCollection, resourcesCollection, staticPagesCollection,
              currentUser,
              MiscAnalyticsModel, VisitedResourceAnalyticsModel, VisitedSkillAnalyticsModel, VisitedTrackAnalyticsModel,
              AppHeaderView, AppFooterView, HomeView, ConnectedHomeView, RegisterUserView, LoginUserView, ResetPasswordView, UserProfileView,
              TrackListView, TrackDetailView, SkillDetailView, SkillBrowserView,
              ResourceHierarchyBreadcrumbView, PromptTrackValidationView, SearchResultsView, StaticPageView) {

        return Backbone.Router.extend({

            initialize: function () {
                this.$home = $('#home');
                this.$main = $('#main');
                this.$header = $('#header');
                this.$footer = $('#footer');

                var self = this;
                this.listenTo(currentUser, "clear", function(){
                    console.log("router: currentUser cleared");
                    // Backbone won't trigger the route if we're already if we're already on the home page
                    // To bypass this problem we unset the fragment temporarily
                    Backbone.history.fragment = null;
                    Backbone.history.navigate("", {trigger: true});
                });

                this.renderHeader();
                this.renderFooter();
            },

            // Global views

            renderHeader: function () {
                this.appHeaderView = VM.createView(Config.constants.VIEWS_ID.HEADER, function() {
                    return new AppHeaderView({model: currentUser});
                });
                this.$header.html(this.appHeaderView.render().$el);
            },

            renderFooter: function () {
                var appFooterView = VM.createView(Config.constants.VIEWS_ID.FOOTER, function() {
                    return new AppFooterView();
                });
                this.$footer.html(appFooterView.render().$el);
            },

            clearHome: function () {
                this.$home.empty().show();
            },

            clearMain: function () {
                this.$main.empty().show();
            },

            hideMain: function () {
                this.$main.hide();
            },

            // Routes handling

            routes: {
                '': 'home',
                'register': 'register',
                'login': 'login',
                'login/redirect': 'loginRedirect',
                'logout': 'logout',
                'reset_password': 'resetPassword',
                'user/profile': 'userProfile',
                'user/profile/:page': 'userProfile',

                'track': 'trackList',
                'track/:track': 'trackDetail',
                'skill/:skill': 'skillDetail',
                'lesson/:lesson': 'lessonDetail',
                'skill/:skill/resource/:resource': 'browseSkillResources',
                'resource/:resource': 'resourceDetail',
                'prompt_track_validation/:track': 'promptTrackValidation',

                'search': 'search',
                'static_page/:page_id': 'staticPage'
            },

            home: function () {
                var visitHomeAnalytics = new MiscAnalyticsModel();
                visitHomeAnalytics.set('type', 'visit_home_page');
                visitHomeAnalytics.save();

                this.clearHome();
                this.clearMain();
                this.hideMain();
                var homeView;
                if (currentUser.isLoggedIn()) {
                    homeView = VM.createView(Config.constants.VIEWS_ID.CONNECTED_HOME, function () {
                        return new ConnectedHomeView();
                    });
                }
                else {
                    homeView = VM.createView(Config.constants.VIEWS_ID.HOME, function () {
                        return new HomeView();
                    });
                }
                this.$home.html(homeView.render().$el);

                this.appHeaderView.updateHeaderButtonFocus('home');
            },

            register: function () {
                var registerUserView = VM.createView(Config.constants.VIEWS_ID.REGISTER, function () {
                    return new RegisterUserView();
                });
                $('body').append(registerUserView.render().$el);
                var self = this;
                registerUserView.$el.on('hidden.bs.modal', function () {
                    var fragment = Backbone.history.getFragment();
                    VM.closeView(Config.constants.VIEWS_ID.REGISTER);
                    self.afterSuccessfulLogin(registerUserView, fragment);
                }).on('shown.bs.modal', function () {
                    registerUserView.$('form input:first').focus();
                }).modal('show');
            },

            login: function () {
                console.log("login");
                var loginUserView = VM.reuseView(Config.constants.VIEWS_ID.LOGIN, function () {
                    return new LoginUserView();
                });
                $('body').append(loginUserView.render().$el);
                var self = this;
                loginUserView.$el.on('hidden.bs.modal', function () {
                    var fragment = Backbone.history.getFragment();
                    VM.closeView(Config.constants.VIEWS_ID.LOGIN);
                    self.afterSuccessfulLogin(loginUserView, fragment);
                }).on('shown.bs.modal', function () {
                    loginUserView.$('form input:first').focus();
                }).modal('show');
            },

            afterSuccessfulLogin: function (authView, nextFragment) {
                authView.undelegateEvents();

                this.navigate(nextFragment, {trigger: true, replace: true});
            },

            logout: function () {
                currentUser.logOut();
            },

            resetPassword: function () {
                var resetPasswordView = VM.createView(Config.constants.VIEWS_ID.RESET_PASSWORD, function() {
                    return new ResetPasswordView();
                });
                $('body').append(resetPasswordView.render().$el);
                resetPasswordView.$el.on('hidden.bs.modal', function () {
                    VM.closeView(Config.constants.VIEWS_ID.RESET_PASSWORD);
                }).on('shown.bs.modal', function () {
                    resetPasswordView.$('form input:first').focus();
                }).modal('show');
            },

            userProfile: function (page) {
                if (page == null) {
                    page = Config.constants.userProfile.DASHBOARD;
                }
                var self = this;
                currentUser.fetch().then(function (result) {
                    self.clearHome();
                    self.clearMain();

                    var userProfileView = VM.createView(Config.constants.VIEWS_ID.USER_PROFILE, function() {
                        return new UserProfileView({model: currentUser});
                    });
                    userProfileView.page = page;
                    self.$main.html(userProfileView.render().$el);

                    self.appHeaderView.updateHeaderButtonFocus('user');
                });
            },

            trackList: function () {
                this.clearHome();
                this.clearMain();

                var trackListView = VM.createView(Config.constants.VIEWS_ID.TRACK_LIST, function() {
                    return new TrackListView({collection: tracksCollection});
                });
                this.$main.html(trackListView.render().$el);

                var analytics = new MiscAnalyticsModel();
                analytics.set('type', 'all_tracks');
                analytics.save();

                this.appHeaderView.updateHeaderButtonFocus('hierarchy');
            },

            trackDetail: function (track) {
                this.clearHome();
                this.clearMain();
                track = tracksCollection.getOrInstantiate(track);

                var trackDetailView = VM.createView(Config.constants.VIEWS_ID.TRACK_DETAIL, function() {
                    return new TrackDetailView({model: track});
                });
                this.$main.html(trackDetailView.render().$el);

                var analytics = new VisitedTrackAnalyticsModel();
                analytics.set('track', track.id);
                analytics.save();
            },

            skillDetail: function (skill) {
                this.clearHome();
                this.clearMain();
                skill = skillsCollection.getOrInstantiate(skill);

                var skillDetailView = VM.createView(Config.constants.VIEWS_ID.SKILL_DETAIL, function() {
                    return new SkillDetailView({model: skill});
                });
                this.$main.append(skillDetailView.render().$el);

                var analytics = new VisitedSkillAnalyticsModel();
                analytics.set('skill', skill.id);
                analytics.save();
            },

            lessonDetail: function (lesson) {
                lesson = lessonsCollection.getOrInstantiate(lesson);
                lesson
                    .fetchIfNeeded()
                    .done(function(){
                        Backbone.history.navigate('skill/' + lesson.get('skill').id, {trigger:true});
                    });
            },

            browseSkillResources: function(skill, resource) {
                this.clearHome();
                this.clearMain();
                skill = skillsCollection.getOrInstantiate(skill);

                var skillBrowserView = VM.createView(Config.constants.VIEWS_ID.SKILL_BROWSER, function() {
                    return new SkillBrowserView({model: skill});
                });
                this.$main.append(skillBrowserView.render().$el);

                skillBrowserView.selectResource(resource);
            },

            getResourceHierarchyBreadcrumbView: function (breadcrumbModel) {
                //return VM.createView(Config.constants.VIEWS_ID.BREADCRUMB, function() {
                //    return new ResourceHierarchyBreadcrumbView({model: breadcrumbModel});
                //});
            },

            promptTrackValidation: function (track) {
                track = tracksCollection.getOrInstantiate(track);
                var promptTrackValidationView = VM.createView(Config.constants.VIEWS_ID.PROMPT_TRACK_VALIDATION, function() {
                    return new PromptTrackValidationView({model: track});
                });
                $('body').append(promptTrackValidationView.render().$el);
                promptTrackValidationView.$el.on('hidden.bs.modal', function() {
                    VM.closeView(Config.constants.VIEWS_ID.PROMPT_TRACK_VALIDATION);
                }).modal('show');

                var promptTrackValidationAnalytics = new MiscAnalyticsModel();
                promptTrackValidationAnalytics.set('type', "prompt_track_validation_test");
                promptTrackValidationAnalytics.set('object_title', track.id);
                promptTrackValidationAnalytics.save();
            },

            search: function (params) {
                var paramsDict = this.getQueryParameters(params);
                var searchedString = paramsDict['search_string'];

                var self = this;
                $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/search",
                    data: {searched_string: searchedString},
                    dataType: 'json'
                }).done(function (response) {
                    self.clearHome();
                    self.clearMain();

                    var searchResultsView = VM.createView(Config.constants.VIEWS_ID.SEARCH_RESULTS, function() {
                        return new SearchResultsView();
                    });
                    searchResultsView.searchedString = searchedString;
                    searchResultsView.results = response.data;
                    $('#main').html(searchResultsView.render().$el);
                }).fail(function (error) {
                    console.log("the search has failed with the following error:\n\t", error);
                });
            },

            staticPage: function (page_id) {
                this.clearHome();
                this.clearMain();

                var self = this;
                staticPagesCollection.fetchIfNeeded().done(
                    function(){
                        var staticPage = staticPagesCollection.findWhere({page_id: page_id});
                        var staticPageView = VM.createView(Config.constants.VIEWS_ID.STATIC_PAGE, function() {
                            return new StaticPageView({model: staticPage});
                        });
                        self.$main.html(staticPageView.render().$el);
                    }
                );
            },

            getQueryParameters: function (str) {
                return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) {
                    return n = n.split("="), this[n[0]] = n[1], this
                }.bind({}))[0];
            }

        });

    }
);
