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

            dsResourceName: Config.constants.dsResourceNames.SKILL,

			serverPath: function() {
				return '/resources/skill/' + this.meta('skill_id');
			}

		});

	}
);
