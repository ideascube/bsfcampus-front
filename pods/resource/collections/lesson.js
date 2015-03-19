define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/resource/model',
		'app/config'
	],
	function($, _, Backbone, 
		AbstractCollection,
		ResourceModel, Config
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
