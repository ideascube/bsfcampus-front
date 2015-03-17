define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/header/view',
		'pods/track/model',
		'pods/track/collection',
		'pods/track/views/list',
		'pods/track/views/detail',
		'pods/skill/model',
		'pods/skill/views/detail',
		'pods/resource/model',
		'pods/resource/views/detail',
		'pods/breadcrumb/views/breadcrumb',
	],
	function($, _, Backbone, AppHeaderView, 
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
				collection.fetch().done(function(){
					var trackListView = new TrackListView({collection: collection});
					trackListView.render();
				});
			},

			trackDetail: function(id) {
				var model = new TrackModel({_id: id});
				model.fetch().done(function(){
					updateResourceHierarchyBreadcrumb(model);
					var trackDetailView = new TrackDetailView({model: model});
					trackDetailView.render();
				});
			},

			skillDetail: function(id) {
				var model = new SkillModel({_id: id});
				model.fetch().done(function(){
					updateResourceHierarchyBreadcrumb(model);
					var skillDetailView = new SkillDetailView({model: model});
					skillDetailView.render();
				});
			},

			resourceDetail: function(id) {
				var model = new ResourceModel({_id: id});
				model.fetch().done(function(){
					updateResourceHierarchyBreadcrumb(model);
					var resourceDetailView = new ResourceDetailView({model: model});
					resourceDetailView.render();
				});
			},

			updateResourceHierarchyBreadcrumb: function(model) {
				var breadcrumbView = new ResourceHierarchyBreadcrumbView({model: model});
				breadcrumbView.render();
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
