define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/skill/model',
		'app/config'
	],
	function($, _, Backbone, 
		AbstractCollection,
		SkillModel, Config
		) {

		return AbstractCollection.extend({

			model: SkillModel,

			jsonKey: 'skills',

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/skills/track';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('track_id');
			},

		});

	}
);
