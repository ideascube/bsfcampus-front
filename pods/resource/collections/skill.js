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

			urlRoot: function() {
				return Config.constants.serverGateway + '/resources/skill';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('skill_id');
			}

		});

	}
);
