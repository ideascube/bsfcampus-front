define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/resource/model',
	],
	function($, _, Backbone, 
		AbstractCollection,
		ResourceModel
		) {

		return AbstractCollection.extend({

			model: ResourceModel,

			jsonKey: 'resources',

			urlRoot: function() {
				return this.serverGateway + '/resources/skill';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('skill_id');
			},

		});

	}
);
