define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'collection',
		
		'pods/skill/model'
	],
	function($, _, Backbone, Config,
		AbstractCollection,
		SkillModel
		) {

		return AbstractCollection.extend({

			model: SkillModel,

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/skills/track';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('track_id');
			}

		});

	}
);
