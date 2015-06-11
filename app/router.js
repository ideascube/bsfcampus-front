define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'app/header/view',
		'app/footer/view',

		'pods/home/view',

		'pods/user/views/register',
		'pods/user/views/login',

		'pods/track/model',
		'pods/track/collection',
		'pods/track/views/list',
		'pods/track/views/detail',

		'pods/skill/model',
		'pods/skill/views/detail',

		'pods/resource/model',
		'pods/resource/views/detail',

		'pods/breadcrumb/views/breadcrumbContainer',

		'pods/user/models/current',

		'less!app/styles/common'
	],
	function($, _, Backbone, Config,
		AppHeaderView, AppFooterView, HomeView, RegisterUserView, LoginUserView,
		TrackModel, TrackCollection, TrackListView, TrackDetailView, 
		SkillModel, SkillDetailView,
		ResourceModel, ResourceDetailView,
		ResourceHierarchyBreadcrumbView,
		currentUser
		) {

		var AppRouter = Backbone.Router.extend({

            // Global views

			renderHeader: function() {
				this.appHeaderView = new AppHeaderView();
				this.appHeaderView.render();
			},

			renderFooter: function() {
				var appFooterView = new AppFooterView();
				appFooterView.render();
			},

			clearHome: function() {
				$('#home').html('');
			},

			clearContainer: function() {
				$('#container').html('');
			},

			clearModal: function() {
                var $modal = $('#modal-container');
                $modal.html('');
                $modal.modal('hide');
			},

            clearLoginModal: function() {
                console.log('clearLoginModal');
                var $modal = $('#modal-login-container');
                $modal.html('');
                $modal.modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
			},

			// Routes handling

			routes: {
				'': 'home',
				'register': 'register',
				'login': 'login',
				'login/redirect': 'login_redirect',
				'logout': 'logout',
				'track': 'trackList',
				'track/:id': 'trackDetail',
				'skill/:id': 'skillDetail',
				'resource/:id': 'resourceDetail'
			},

            home: function () {
                this.clearHome();
				this.clearContainer();
				this.clearModal();
				this.clearLoginModal();

				var homeView = new HomeView();
				homeView.render();
				$('#home').append(homeView.$el);

                this.appHeaderView.updateHeaderButtonFocus('home');
			},

			login: function () {
                console.log("login");
                this.clearLoginModal();
                var loginUserView = new LoginUserView();
                loginUserView.render();
                this.listenTo(loginUserView, 'close', this.clearLoginModal);
				var $modal = $('#modal-login-container');
				$modal.html(loginUserView.$el);
				$modal.modal('show');
			},

			login_redirect: function () {
                console.log("login_redirect");
                this.clearLoginModal();
                var self = this;
                var next = Backbone.history.getFragment();
                var loginUserView = new LoginUserView();
                loginUserView.render();
                this.listenTo(loginUserView, 'close', function () {
                    self.clearLoginModal();
                    Backbone.history.loadUrl(next);
                });
				var $modal = $('#modal-login-container');
				$modal.html(loginUserView.$el);
				$modal.modal('show');
			},

			logout: function () {
				console.log("logout");
				$.ajax({
					type: 'POST',
					contentType: 'application/json',
					url: Config.constants.serverGateway + "/users/logout",
					dataType: 'json'
				}).done(function(result){
					console.log(JSON.stringify(result));
					currentUser.clear();
					Backbone.history.navigate('', {trigger: true});
				}).fail(function(error){
					console.log("Could not log out", error);
					// TODO: implement case where logout is wrong
				});
			},

			register: function () {
                console.log("register");
                this.clearLoginModal();
                var registerUserView = new RegisterUserView();
				registerUserView.render();
                this.listenTo(registerUserView, 'close', this.clearLoginModal);
				var $modal = $('#modal-login-container');
				$modal.html(registerUserView.$el);
				$modal.modal({show: true});
			},

			trackList: function() {
				var collection = new TrackCollection();
				var self = this;
				collection.fetch().done(function(){
                    self.clearHome();
					self.clearContainer();
                    self.clearModal();

					var trackListView = new TrackListView({collection: collection});
					trackListView.render();
					$('#container').append(trackListView.$el);
				});

				this.appHeaderView.updateHeaderButtonFocus('hierarchy');
			},

			trackDetail: function(id) {
				var model = new TrackModel({_id: id});
				var self = this;
				model.fetch().done(function(){
                    self.clearHome();
					self.clearContainer();
                    self.clearModal();

					var trackDetailView = new TrackDetailView({model: model});
					trackDetailView.render();
					$('#container').append(trackDetailView.$el);
				});
			},

			skillDetail: function(id) {
				var model = new SkillModel({_id: id});
				var self = this;
				model.fetch().done(function(){
                    self.clearHome();
					self.clearContainer();
                    self.clearModal();
					self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

					var skillDetailView = new SkillDetailView({model: model});
					skillDetailView.render();
					$('#container').append(skillDetailView.$el);
				});
			},

			resourceDetail: function(id) {
				var model = new ResourceModel({_id: id});
				var self = this;
				model.fetch().done(function(){
                    self.clearHome();
					self.clearContainer();
                    self.clearModal();
					self.renderResourceHierarchyBreadcrumb(model.get('breadcrumb'));

					var resourceDetailView = new ResourceDetailView({model: model});
					resourceDetailView.render();
					$('#container').append(resourceDetailView.$el);
				});
			},

			renderResourceHierarchyBreadcrumb: function(breadcrumbModel) {
				var breadcrumbView = new ResourceHierarchyBreadcrumbView({model: breadcrumbModel});
				breadcrumbView.render();
				$('#container').append(breadcrumbView.$el);
			}

		});

		return {
			initialize: function() {

                // Use withCredentials to send the server cookies
                // The server must allow this through response headers
                $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
                    options.xhrFields = {
                        withCredentials: true
                    };
                    //// If we have a csrf token send it through with the next request
                    //if(typeof that.get('_csrf') !== 'undefined') {
                    //    jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
                    //}
                });

                // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
                $.ajaxSetup({
                    statusCode: {
                        403: function(){
                            // Redirec the to the login page.
                            console.log("error 401 detected");
                            Backbone.history.loadUrl("/login/redirect");
                        }
                    }
                });

				var app_router = new AppRouter();
				app_router.renderHeader();
				app_router.renderFooter();
				Backbone.history.start();

				currentUser.fetch();
			}
		};

	}
);
