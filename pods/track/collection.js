define(
	[
		'jquery',
		'underscore',
		'backbone',
		'pods/track/model',
	],
	function($, _, Backbone, TrackModel) {

		return Backbone.Collection.extend({

			model: TrackModel,

			url: 'http://localhost:5000/hierarchy/tracks',

			parse: function(response) {
				return response.tracks;
			}

		});

	}
);
