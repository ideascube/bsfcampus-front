define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'collection',
		
		'pods/resource/model',
	],
	function($, _, Backbone, Config,
		AbstractCollection,
		ResourceModel
		) {

		return AbstractCollection.extend({

			model: ResourceModel,

			jsonKey: 'resources',

			urlRoot: function() {
				return Config.constants.serverGateway + '/resources/lesson';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('lesson_id');
			},

		});

	}
);
