define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'collection',
		
		'pods/track/model'
	],
	function($, _, Backbone, Config,
		AbstractCollection,
		TrackModel
		) {

		return AbstractCollection.extend({

			model: TrackModel,

            dsResourceName: Config.constants.dsResourceNames.TRACK,

			serverPath: '/hierarchy/tracks'

		});

	}
);
