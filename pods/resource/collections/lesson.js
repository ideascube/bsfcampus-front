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

            dsResourceName: 'lesson',

			serverPath: function() {
				return '/resources/lesson/' + this.meta('lesson_id');
			}

		});

	}
);
