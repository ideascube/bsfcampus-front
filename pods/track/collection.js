define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/track/model',
	],
	function($, _, Backbone,
		AbstractCollection,
		TrackModel
		) {

		return AbstractCollection.extend({

			model: TrackModel,

			jsonKey: 'tracks',

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/tracks';
			},

			url: function() {
				return this.urlRoot();
			},

		});

	}
);
