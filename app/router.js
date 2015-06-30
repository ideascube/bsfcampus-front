define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'app/header/view',
        'app/footer/view',

        'pods/home/view',

        'pods/user/connection/views/register',
        'pods/user/connection/views/login',
        'pods/user/profile/views/profile',

        'pods/track/model',
        'pods/track/collection',
        'pods/track/views/list',
        'pods/track/views/detail',

        'pods/skill/model',
        'pods/skill/views/detail',

        'pods/lesson/model',

        'pods/resource/model',
        'pods/resource/views/detail',

        'pods/breadcrumb/views/breadcrumbContainer',

        'pods/user/models/current',

        'less!app/styles/common'
    ],
    function ($, _, Backbone, Config,
              AppHeaderView, AppFooterView, HomeView, RegisterUserView, LoginUserView, UserProfileView,
              TrackModel, TrackCollection, TrackListView, TrackDetailView,
              SkillModel, SkillDetailView,
              LessonModel,
              ResourceModel, ResourceDetailView,
              ResourceHierarchyBreadcrumbView,
              currentUser) {

        var AppRouter = Backbone.Router.extend({

            initialize: function() {
                this.$modal = $('#modal');
                this.$modalDialog = this.$modal.find('.modal-dialog');
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

                'track': 'trackList',
                'track/:id': 'trackDetail',
                'skill/:id': 'skillDetail',
                'lesson/:id': 'lessonDetail',
                'resource/:id': 'resourceDetail'
            },

            home: function () {
                this.clearHome();
                this.clearContainer();
                this.hideContainer();
                this.clearModal();

                var homeView = new HomeView({
                    el: $('#home')
                });
                homeView.render();

                this.appHeaderView.updateHeaderButtonFocus('home');
            },

            register: function () {
                this.clearModal();
                var registerUserView = new RegisterUserView({
                    el: this.$modalDialog
                });
                registerUserView.render();
                this.listenTo(registerUserView, 'close', this.clearModal);
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
                this.listenTo(loginUserView, 'close', this.clearModal);
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

            logout: function () {
                currentUser.logOut();
                Backbone.history.navigate('', {trigger: true});
            },

            userProfile: function () {
                var self = this;
                currentUser.fetch().done(function () {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var userProfileView = new UserProfileView({model: currentUser});
                    userProfileView.render();
                    $('#container').append(userProfileView.$el);
                });
            },

            trackList: function () {
                var collection = new TrackCollection();
                var self = this;
                collection.fetch().done(function () {
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
                var model = new TrackModel({_id: id});
                var self = this;
                model.fetch().done(function () {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();

                    var trackDetailView = new TrackDetailView({model: model});
                    trackDetailView.render();
                    $('#container').append(trackDetailView.$el);
                });
            },

            skillDetail: function (id) {
                var model = new SkillModel({_id: id});
                var self = this;
                model.fetch().done(function () {
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
                var model = new LessonModel({_id: id});
                var self = this;
                model.fetch().done(function () {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();
                    self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

                    //FIXME show something here, or redirect to skill detail
                });
            },

            resourceDetail: function (id) {
                var model = new ResourceModel({_id: id});
                var self = this;
                model.fetch().done(function () {
                    self.clearHome();
                    self.clearContainer();
                    self.clearModal();
                    self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

                    var resourceDetailView = new ResourceDetailView({model: model});
                    resourceDetailView.render();
                    $('#container').append(resourceDetailView.$el);
                });
            },

            renderResourceHierarchyBreadcrumb: function (breadcrumbModel) {
                var breadcrumbView = new ResourceHierarchyBreadcrumbView({model: breadcrumbModel});
                breadcrumbView.render();
                $('#container').append(breadcrumbView.$el);
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
                            Backbone.history.loadUrl("/login/redirect");
                        }
                    }
                });

                if (currentUser.isLoggedIn()) {
                    currentUser.fetch().fail(
                        function() {
                            currentUser.logOut();
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
