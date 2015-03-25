define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'app/header/view',

		'pods/track/model',
		'pods/track/collection',
		'pods/track/views/list',
		'pods/track/views/detail',

		'pods/skill/model',
		'pods/skill/views/detail',

		'pods/resource/model',
		'pods/resource/views/detail',

		'pods/breadcrumb/views/breadcrumbContainer',

		'less!app/styles/common',
	],
	function($, _, Backbone, Config,
		AppHeaderView, 
		TrackModel, TrackCollection, TrackListView, TrackDetailView, 
		SkillModel, SkillDetailView,
		ResourceModel, ResourceDetailView,
		ResourceHierarchyBreadcrumbView
		) {

		var AppRouter = Backbone.Router.extend({

			// Global views

			renderHeader: function() {
				var appHeaderView = new AppHeaderView();
				appHeaderView.render();
			},

			clearContainer: function() {
				$('#container').html('');
			},

			// Routes handling

			routes: {
				'': 'home',
				'track': 'trackList',
				'track/:id': 'trackDetail',
				'skill/:id': 'skillDetail',
				'resource/:id': 'resourceDetail',
			},

			home: function () {
			},

			trackList: function() {
				var collection = new TrackCollection();
				var self = this;
				collection.fetch().done(function(){
					self.clearContainer();

					var trackListView = new TrackListView({collection: collection});
					trackListView.render();
					$('#container').append(trackListView.$el);
				});
			},

			trackDetail: function(id) {
				var model = new TrackModel({_id: id});
				var self = this;
				model.fetch().done(function(){
					self.clearContainer();

					var trackDetailView = new TrackDetailView({model: model});
					trackDetailView.render();
					$('#container').append(trackDetailView.$el);
				});
			},

			skillDetail: function(id) {
				var model = new SkillModel({_id: id});
				var self = this;
				model.fetch().done(function(){
					self.clearContainer();
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
					self.clearContainer();
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
				var app_router = new AppRouter();
				app_router.renderHeader();
				Backbone.history.start();
			}
		};

	}
);
