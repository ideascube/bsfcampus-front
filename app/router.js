define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'ds',
        'app/config',

        'pods/user/models/current',
        'pods/user/collections/user',
        'app/misc-analytic-model',
        'pods/track/collection',
        'pods/track/model',
        'pods/skill/collection',
        'pods/skill/model',
        'pods/lesson/collection',
        'pods/lesson/model',
        'pods/resource/collection',
        'pods/resource/model',
        'pods/static-page/collection',
        'pods/static-page/model',

        'app/header/view',
        'app/footer/view',
        'pods/home/view',
        'pods/home-connected/view',
        'pods/user/connection/views/register',
        'pods/user/connection/views/login',
        'pods/user/profile/views/profile',
        'pods/track/views/list',
        'pods/track/views/detail',
        'pods/skill/views/detail',
        'pods/resource/views/detail',
        'pods/breadcrumb/views/breadcrumbContainer',
        'pods/track/views/promptValidation',
        'pods/search/view',
        'pods/static-page/view',

        'less!app/styles/common'
    ],
    function ($, _, Backbone, VM, DS, Config,
              currentUser, UserCollection, MiscAnalyticsModel, TrackCollection, TrackModel, SkillCollection, SkillModel,
              LessonCollection, LessonModel, ResourceCollection, ResourceModel, StaticPageCollection, StaticPageModel,
              AppHeaderView, AppFooterView, HomeView, ConnectedHomeView, RegisterUserView, LoginUserView, UserProfileView,
              TrackListView, TrackDetailView, SkillDetailView, ResourceDetailView,
              ResourceHierarchyBreadcrumbView, PromptTrackValidationView, SearchResultsView, StaticPageView
              ) {

        var AppRouter = Backbone.Router.extend({

            initialize: function() {
                this.$modal = $('#modal');
                this.$modalDialog = this.$modal.find('.modal-dialog');
                this.initDataStore();
            },

            initDataStore: function() {
                // Static pages
                DS.defineResource({
                    name: Config.constants.dsResourceNames.STATIC_PAGE,
                    idAttribute: '_id',
                    collection: StaticPageCollection
                });
                DS.findAll(Config.constants.dsResourceNames.STATIC_PAGE).done(function(collection) {
                    console.log('static pages fetched: ', collection.toJSON());
                });

                // Tracks
                DS.defineResource({
                    name: Config.constants.dsResourceNames.TRACK,
                    idAttribute: '_id',
                    collection: TrackCollection
                });

                // Skills
                DS.defineResource({
                    name: Config.constants.dsResourceNames.SKILL,
                    idAttribute: '_id',
                    collection: SkillCollection
                });

                // Lessons
                DS.defineResource({
                    name: Config.constants.dsResourceNames.LESSON,
                    idAttribute: '_id',
                    collection: LessonCollection
                });

                // Resources
                DS.defineResource({
                    name: Config.constants.dsResourceNames.RESOURCE,
                    idAttribute: '_id',
                    collection: ResourceCollection
                });

                // Users
                DS.defineResource({
                    name: Config.constants.dsResourceNames.USER,
                    idAttribute: '_id',
                    collection: UserCollection
                });
            },

            // Global views

            renderHeader: function () {
                this.appHeaderView = new AppHeaderView();
                this.appHeaderView.render();
            },

            renderFooter: function () {
                var appFooterView = new AppFooterView();
                appFooterView.render();
            },

            clearHome: function () {
                $('#home').html('');
            },

            clearContainer: function () {
                var $container = $('#container');
                $container.show();
                $container.html('');
            },

            hideContainer: function () {
                $('#container').hide();
            },

            clearModal: function () {
                this.$modalDialog.empty();
                this.$modal.modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },

            // Routes handling

            routes: {
                '': 'home',
                'register': 'register',
                'login': 'login',
                'login/redirect': 'loginRedirect',
                'logout': 'logout',
                'user/profile': 'userProfile',
                'user/profile/:page': 'userProfile',

                'track': 'trackList',
                'track/:id': 'trackDetail',
                'skill/:id': 'skillDetail',
                'lesson/:id': 'lessonDetail',
                'resource/:id': 'resourceDetail',
                'prompt_track_validation/:track_id': 'promptTrackValidation',

                'search': 'search',
                'static_page/:page_id': 'staticPage'
            },

            home: function () {
                var visitHomeAnalytics = new MiscAnalyticsModel();
                visitHomeAnalytics.type = "visit_home_page";
                visitHomeAnalytics.save();

                this.clearHome();
                this.clearContainer();
                this.hideContainer();
                this.clearModal();
                var homeView = null;
                if (currentUser.isLoggedIn())
                {
                    homeView = VM.createView(Config.constants.VIEWS_ID.CONNECTED_HOME, function() {
                        return new ConnectedHomeView();
                    });
                }
                else {
                    homeView = VM.createView(Config.constants.VIEWS_ID.HOME, function () {
                        return new HomeView();
                    });
                }
                homeView.render();
                $('#home').append(homeView.$el);

                this.appHeaderView.updateHeaderButtonFocus('home');
            },

            register: function () {
                this.clearModal();
                var registerUserView = new RegisterUserView({
                    el: this.$modalDialog
                });
                registerUserView.render();
                var self = this;
                this.listenTo(registerUserView, 'close', function() {
                    self.returnFromAuthenticationPopup(registerUserView);
                });
                this.$modal.on('shown.bs.modal', function() {
                    registerUserView.$('form input#full_name').focus();
                }).modal({show: true});
            },

            login: function () {
                this.clearModal();
                var loginUserView = new LoginUserView({
                    el: this.$modalDialog
                });
                loginUserView.render();
                var self = this;
                this.listenTo(loginUserView, 'close', function() {
                    self.returnFromAuthenticationPopup(loginUserView);
                });
                this.$modal.on('shown.bs.modal', function() {
                    loginUserView.$('form input#username').focus();
                }).modal('show');
            },

            loginRedirect: function () {
                var self = this;
                var next = Backbone.history.getFragment();
                var loginUserView = new LoginUserView({
                    el: this.$modalDialog
                });
                loginUserView.render();
                this.listenTo(loginUserView, 'close', function () {
                    self.clearModal();
                    Backbone.history.loadUrl(next);
                });
                this.$modal.on('shown.bs.modal', function() {
                    loginUserView.$('form input#username').focus();
                }).modal('show');
            },

            returnFromAuthenticationPopup: function (authView) {
                console.log("returnFromAuthenticationPopup");
                this.clearModal();
                authView.undelegateEvents();
                var fragment = Backbone.history.getFragment();
                this.navigate(fragment, {trigger:true, replace:true});
            },

            logout: function () {
                var logoutAnalytics = new MiscAnalyticsModel();
                logoutAnalytics.type = "user_logout";
                logoutAnalytics.title = currentUser.get('username');
                logoutAnalytics.save();
                currentUser.logOut();
                Backbone.history.navigate('', {trigger: true});
            },

            userProfile: function (page) {
                if (page == null)
                {
                    page = Config.constants.userProfile.DASHBOARD;
                }
                var self = this;
                currentUser.fetch().then(function(result) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var userProfileView = new UserProfileView({model: currentUser});
                    userProfileView.page = page;
                    userProfileView.render();
                    $('#container').append(userProfileView.$el);

                    self.appHeaderView.updateHeaderButtonFocus('user');
                });
            },

            trackList: function () {
                var self = this;
                DS.findAll(Config.constants.dsResourceNames.TRACK).done(function (collection) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var trackListView = new TrackListView({collection: collection});
                    trackListView.render();
                    $('#container').append(trackListView.$el);
                });

                this.appHeaderView.updateHeaderButtonFocus('hierarchy');
            },

            trackDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.TRACK, id).then(function (model) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var trackDetailView = new TrackDetailView({model: model});
                    trackDetailView.render();
                    $('#container').append(trackDetailView.$el);
                });
            },

            skillDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.SKILL, id).then(function (model) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();
                    self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

                    var skillDetailView = new SkillDetailView({model: model});
                    skillDetailView.render();
                    $('#container').append(skillDetailView.$el);
                });
            },

            lessonDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.LESSON, id).then(function (model) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();
                    self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

                    var skillId = model.get('skill')._id;
                    Backbone.history.navigate('skill/' + skillId, {trigger: true});
                });
            },

            resourceDetail: function (id) {
                var model = new ResourceModel({_id: id});
                var self = this;
                DS.find(Config.constants.dsResourceNames.RESOURCE, id).then(function (model) {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();
                    self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

                    var resourceDetailView = new ResourceDetailView({model: model});
                    resourceDetailView.render();
                    $('#container').append(resourceDetailView.$el);
                }, function (error) {
                    // error
                });
            },

            renderResourceHierarchyBreadcrumb: function (breadcrumbModel) {
                var breadcrumbView = new ResourceHierarchyBreadcrumbView({model: breadcrumbModel});
                breadcrumbView.render();
                $('#container').append(breadcrumbView.$el);
            },

            promptTrackValidation: function (track_id) {
                var promptTrackValidationAnalytics = new MiscAnalyticsModel();
                promptTrackValidationAnalytics.type = "prompt_track_validation_test";
                promptTrackValidationAnalytics.title = track_id;
                promptTrackValidationAnalytics.save();
                this.clearModal();
                var promptTrackValidationView = new PromptTrackValidationView({
                    el: this.$modalDialog
                });
                promptTrackValidationView.trackId = track_id;
                promptTrackValidationView.render();
                this.listenTo(promptTrackValidationView, 'close', this.clearModal);
                this.$modal.modal('show');
            },

            search: function(params) {
                var paramsDict = this.getQueryParameters(params);
                var searchedString = paramsDict['search_string'];

                var self = this;
                $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/search",
                    data: {searched_string: searchedString},
                    dataType: 'json'
                }).done(function(response) {
                    console.log("the search has been proceeded with no error");
                    console.log(JSON.stringify(response.data));
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var searchResultsView = new SearchResultsView();
                    searchResultsView.searchedString = searchedString;
                    searchResultsView.results = response.data;
                    $('#container').append(searchResultsView.render());
                }).then(
                    function(result) {
                        // nothing
                    }, function(err) {
                        console.log("the search has failed with the following error:\n\t", error );
                    }
                );
            },

            staticPage: function(page_id) {
                this.clearHome();
                this.clearContainer();
                this.clearModal();

                var staticPageView = new StaticPageView();
                staticPageView.pageId = page_id;

                $('#container').append(staticPageView.render());
            },

            getQueryParameters : function(str) {
                return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
            }

        });

        return {
            initialize: function () {

                currentUser.findSession();

                $(document).ajaxSend(function(event, jqxhr, settings) {
                    if (currentUser.jwt !== null) {
                        jqxhr.setRequestHeader('Authorization', 'Bearer ' + currentUser.jwt);
                    }
                });

                // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
                $.ajaxSetup({
                    statusCode: {
                        401: function () {
                            // Redirect the to the login page.
                            console.log("error 401 detected");
                            console.log(Backbone.history.getFragment());
                            currentUser.logOut();
                            if (Backbone.history.getFragment() != '')
                            {
                                Backbone.history.loadUrl("/login/redirect");
                            }
                            else
                            {
                                Backbone.history.loadUrl('', {trigger: true, replace: true});
                            }
                        }
                    }
                });

                if (currentUser.isLoggedIn()) {
                    currentUser.fetch().then(
                        function(result) {
                            console.log('current user has been fetched');
                        }, function(err) {
                            console.log("current user doesn't exist");
                        }
                    );
                }

                var app_router = new AppRouter();
                app_router.renderHeader();
                app_router.renderFooter();
                Backbone.history.start();
            }
        };

    }
);
