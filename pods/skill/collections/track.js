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

            dsResourceName: Config.constants.dsResourceNames.TRACKS,

			serverPath: function() {
				return '/hierarchy/skills/track/' + this.meta('track_id');
			}

		});

	}
);
