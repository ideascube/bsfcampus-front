define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/header/view'
	],
	function($, _, Backbone, AppHeaderView) {

		var AppRouter = Backbone.Router.extend({

			routes: {
				"": "home",
				"track": "trackList",
				"track/:id": "trackDetail"
			},

			home: function () {
				console.log("Accessing home");
				var appHeaderView = new AppHeaderView();
				appHeaderView.render();
			},

			trackList: function() {
				console.log("Accessing track list");
			},

			trackDetail: function(id) {
				console.log("Accessing track " + id);
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
