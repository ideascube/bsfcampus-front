define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'ds',
        'app/config',

        'collection',
        'model',

        'pods/user/models/current',
        'pods/user/collections/user',
        'pods/analytics/models/misc',
        'pods/analytics/models/visitedResource',
        'pods/analytics/models/visitedSkill',
        'pods/analytics/models/visitedTrack',
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
        'pods/user/connection/views/resetPassword',
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
              AbstractCollection, AbstractModel,
              currentUser, UserCollection,
              MiscAnalyticsModel, VisitedResourceAnalyticsModel, VisitedSkillAnalyticsModel, VisitedTrackAnalyticsModel,
              TrackCollection, TrackModel, SkillCollection, SkillModel,
              LessonCollection, LessonModel, ResourceCollection, ResourceModel, StaticPageCollection, StaticPageModel,
              AppHeaderView, AppFooterView, HomeView, ConnectedHomeView, RegisterUserView, LoginUserView, ResetPasswordView, UserProfileView,
              TrackListView, TrackDetailView, SkillDetailView, ResourceDetailView,
              ResourceHierarchyBreadcrumbView, PromptTrackValidationView, SearchResultsView, StaticPageView) {

        var AppRouter = Backbone.Router.extend({

            initialize: function () {
                var self = this;

                this.$home = $('#home');
                this.$main = $('#main');
                this.$header = $('#header');
                this.$footer = $('#footer');

                this.resetDataStore();
                this.getDataStoreSkeletonData().done(function (response) {
                    console.log("the hierarchy skeleton has been returned");
                    console.log(JSON.stringify(response.data));

                    self.initDataStoreSkeletonContent(response.data);
                }).fail(function (error) {
                    console.log("the hierarchy skeleton could not be gotten:", error);
                    // TODO: display an error page
                });
            },

            resetDataStore: function () {
                DS.reset();

                // Static pages
                DS.defineResource({
                    name: Config.constants.dsResourceNames.STATIC_PAGE,
                    idAttribute: '_id',
                    collection: StaticPageCollection
                });
                DS.findAll(Config.constants.dsResourceNames.STATIC_PAGE).done(function (collection) {
                    console.log('static pages fetched: ', collection.toJSON());
                });

                // Tracks
                DS.defineResource({
                    name: Config.constants.dsResourceNames.TRACKS,
                    idAttribute: '_id',
                    collection: TrackCollection
                });

                // Skills
                DS.defineResource({
                    name: Config.constants.dsResourceNames.SKILLS,
                    idAttribute: '_id',
                    collection: SkillCollection
                });

                // Lessons
                DS.defineResource({
                    name: Config.constants.dsResourceNames.LESSONS,
                    idAttribute: '_id',
                    collection: LessonCollection
                });

                // Resources
                DS.defineResource({
                    name: Config.constants.dsResourceNames.RESOURCES,
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

            getDataStoreSkeletonData: function () {
                return $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/hierarchy",
                    dataType: 'json'
                });
            },

            getCollectionFromJSONData: function (data) {
                var models = [];
                _.each(data, function (modelData) {
                    var model = new AbstractModel({data: modelData}, {parse: true});

                    models.push(model);
                });
                return new AbstractCollection(models);
            },

            initDataStoreSkeletonContent: function (data) {
                console.log('router.initDataStoreSkeletonContent');

                // init the values of all
                var tracksCollectionSON = this.getCollectionFromJSONData(data).toJSON();
                DS.inject(Config.constants.dsResourceNames.TRACKS, tracksCollectionSON, {incomplete: true});

                var skillsCollectionSON = _.flatten(_.pluck(tracksCollectionSON, 'skills'));
                DS.inject(Config.constants.dsResourceNames.SKILLS, skillsCollectionSON, {incomplete: true});

                var lessonsCollectionSON = _.flatten(_.pluck(skillsCollectionSON, 'lessons'));
                DS.inject(Config.constants.dsResourceNames.LESSONS, lessonsCollectionSON, {incomplete: true});

                var resourcesCollectionSON = _.flatten(_.pluck(lessonsCollectionSON, 'resources'));
                DS.inject(Config.constants.dsResourceNames.RESOURCES, resourcesCollectionSON, {incomplete: true});

                var additionalResourcesCollectionSON = _.flatten(_.pluck(resourcesCollectionSON, 'additional_resources'));
                DS.inject(Config.constants.dsResourceNames.RESOURCES, additionalResourcesCollectionSON, {incomplete: true});
            },

            // Global views

            renderHeader: function () {
                this.appHeaderView = VM.createView(Config.constants.VIEWS_ID.HEADER, function() {
                    return new AppHeaderView();
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
                var loginUserView = VM.createView(Config.constants.VIEWS_ID.LOGIN, function () {
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

                this.getDataStoreSkeletonData();
                this.navigate(nextFragment, {trigger: true, replace: true});
            },

            logout: function () {
                currentUser.logOut();
                this.resetDataStore();
                Backbone.history.navigate('', {trigger: true});
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
                var self = this;
                DS.findAll(Config.constants.dsResourceNames.TRACKS).done(function (collection) {
                    self.clearHome();
                    self.clearMain();

                    var trackListView = VM.createView(Config.constants.VIEWS_ID.TRACK_LIST, function() {
                        return new TrackListView({collection: collection});
                    });
                    self.$main.html(trackListView.render().$el);

                    var analytics = new MiscAnalyticsModel();
                    analytics.set('type', 'all_tracks');
                    analytics.save();
                });

                this.appHeaderView.updateHeaderButtonFocus('hierarchy');
            },

            trackDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.TRACKS, id).then(function (model) {
                    self.clearHome();
                    self.clearMain();

                    var trackDetailView = VM.createView(Config.constants.VIEWS_ID.TRACK_DETAIL, function() {
                        return new TrackDetailView({model: model});
                    });
                    self.$main.html(trackDetailView.render().$el);

                    var analytics = new VisitedTrackAnalyticsModel();
                    analytics.set('track', model.id);
                    analytics.save();
                });
            },

            skillDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.SKILLS, id).then(function (model) {
                    self.clearHome();
                    self.clearMain();

                    var hierarchyBreadcrumbView = self.getResourceHierarchyBreadcrumbView(model.get('hierarchy'));
                    self.$main.append(hierarchyBreadcrumbView.render().$el);

                    var skillDetailView = VM.createView(Config.constants.VIEWS_ID.SKILL_DETAIL, function() {
                        return new SkillDetailView({model: model});
                    });
                    self.$main.append(skillDetailView.render().$el);

                    var analytics = new VisitedSkillAnalyticsModel();
                    analytics.set('skill', model.id);
                    analytics.save();
                });
            },

            lessonDetail: function (id) {
                DS.find(Config.constants.dsResourceNames.LESSONS, id).then(function (model) {
                    var skillId = model.get('skill')._id;
                    Backbone.history.navigate('skill/' + skillId, {trigger: true});
                });
            },

            resourceDetail: function (id) {
                var self = this;
                DS.find(Config.constants.dsResourceNames.RESOURCES, id).then(function (model) {
                    self.clearHome();
                    self.clearMain();

                    var hierarchyBreadcrumbView = self.getResourceHierarchyBreadcrumbView(model.get('hierarchy'));
                    self.$main.append(hierarchyBreadcrumbView.render().$el);

                    var resourceDetailView = VM.createView(Config.constants.VIEWS_ID.RESOURCE_DETAIL, function() {
                        return new ResourceDetailView({model: model});
                    });
                    self.$main.append(resourceDetailView.render().$el);

                    var analytics = new VisitedResourceAnalyticsModel();
                    analytics.set('resource', model.id);
                    analytics.save();
                });
            },

            getResourceHierarchyBreadcrumbView: function (breadcrumbModel) {
                return VM.createView(Config.constants.VIEWS_ID.BREADCRUMB, function() {
                    return new ResourceHierarchyBreadcrumbView({model: breadcrumbModel});
                });
            },

            promptTrackValidation: function (track_id) {
                var promptTrackValidationView = VM.createView(Config.constants.VIEWS_ID.PROMPT_TRACK_VALIDATION, function() {
                    return new PromptTrackValidationView();
                });
                promptTrackValidationView.trackId = track_id;
                $('body').append(promptTrackValidationView.render().$el);
                promptTrackValidationView.$el.on('hidden.bs.modal', function() {
                    VM.closeView(Config.constants.VIEWS_ID.PROMPT_TRACK_VALIDATION);
                }).modal('show');

                var promptTrackValidationAnalytics = new MiscAnalyticsModel();
                promptTrackValidationAnalytics.set('type', "prompt_track_validation_test");
                promptTrackValidationAnalytics.set('object_title', track_id);
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
                    console.log("the search has been proceeded with no error");
                    console.log(JSON.stringify(response.data));
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

                var staticPageView = VM.createView(Config.constants.VIEWS_ID.STATIC_PAGE, function() {
                    return new StaticPageView();
                });
                staticPageView.pageId = page_id;

                this.$main.html(staticPageView.render().$el);
            },

            getQueryParameters: function (str) {
                return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) {
                    return n = n.split("="), this[n[0]] = n[1], this
                }.bind({}))[0];
            }

        });

        return {
            initialize: function () {

                currentUser.findSession();

                $(document).ajaxSend(function (event, jqxhr, settings) {
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
                            currentUser.logOut();
                            if (Backbone.history.getFragment() != '') {
                                Backbone.history.loadUrl("/login");
                            }
                            else {
                                Backbone.history.loadUrl('', {trigger: true, replace: true});
                            }
                        }
                    }
                });


                if (currentUser.isLoggedIn()) {
                    currentUser.fetch().then(
                        function (result) {
                            console.log('current user has been fetched');
                        }, function (err) {
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
