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
		'pods/skill/views/detail',
		'pods/skill/model',
	],
	function($, _, Backbone, AppHeaderView, 
		TrackModel, TrackCollection, TrackListView, TrackDetailView, SkillDetailView, SkillModel) {

		var AppRouter = Backbone.Router.extend({

			routes: {
				'': 'home',
				'track': 'trackList',
				'track/:id': 'trackDetail',
				'skill/:id': 'skillDetail'
			},

			renderHeader: function() {
				var appHeaderView = new AppHeaderView();
				appHeaderView.render();
			},

			home: function () {
				this.renderHeader();
			},

			trackList: function() {
				this.renderHeader();
				var collection = new TrackCollection();
				collection.fetch().done(function(){
					var trackListView = new TrackListView({collection: collection});
					trackListView.render();
				});
			},

			trackDetail: function(id) {
				this.renderHeader();
				var model = new TrackModel({_id: id});
				model.fetch().done(function(){
					var trackDetailView = new TrackDetailView({model: model});
					trackDetailView.render();
				});
			},

			skillDetail: function(id) {
				this.renderHeader();
				var model = new SkillModel({_id: id});
				model.fetch().done(function(){
					var skillDetailView = new SkillDetailView({model: model});
					skillDetailView.render();
				});
			}

		});

		return {
			initialize: function() {
				var app_router = new AppRouter();
				Backbone.history.start();
			}
		};

	}
);
