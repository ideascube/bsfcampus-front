define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/header/view',
		'pods/track/model',
		'pods/track/collection',
		'pods/track/views/list',
	],
	function($, _, Backbone, AppHeaderView, TrackModel, TrackCollection, TrackListView) {

		var AppRouter = Backbone.Router.extend({

			routes: {
				'': 'home',
				'track': 'trackList',
				'track/:id': 'trackDetail'
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
				collection.fetch().done(function(c){
					var trackListView = new TrackListView({collection: collection});
					trackListView.render();
				});
			},

			trackDetail: function(id) {
				this.renderHeader();
			},

		});

		return {
			initialize: function() {
				var app_router = new AppRouter();
				Backbone.history.start();
			}
		};

	}
);
