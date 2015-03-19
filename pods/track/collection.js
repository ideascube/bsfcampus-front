define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/track/model',
		'app/config'
	],
	function($, _, Backbone,
		AbstractCollection,
		TrackModel, Config
		) {

		return AbstractCollection.extend({

			model: TrackModel,

			jsonKey: 'tracks',

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/tracks';
			},

			url: function() {
				return this.urlRoot();
			},

		});

	}
);
