define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-collection',
		'pods/track/model',
	],
	function($, _, Backbone, AbstractCollection, TrackModel) {

		return AbstractCollection.extend({

			model: TrackModel,

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/tracks';
			},

			url: function() {
				console.log("url", this.urlRoot());
				return this.urlRoot();
			},

			parse: function(response) {
				return response.tracks;
			}

		});

	}
);
