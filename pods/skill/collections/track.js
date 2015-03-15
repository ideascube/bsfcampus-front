define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'collection',
		
		'pods/skill/model',
	],
	function($, _, Backbone, 
		AbstractCollection,
		SkillModel
		) {

		return AbstractCollection.extend({

			model: SkillModel,

			jsonKey: 'skills',

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/skills/track';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('track_id');
			},

		});

	}
);
