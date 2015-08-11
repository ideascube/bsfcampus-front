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

            dsResourceName: Config.constants.dsResourceNames.LESSONS,

			serverPath: function() {
				return '/resources/lesson/' + this.meta('lesson_id');
			}

		});

	}
);
