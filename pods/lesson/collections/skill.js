define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'collection',
		
		'pods/lesson/model',
	],
	function($, _, Backbone, Config,
		AbstractCollection,
		LessonModel
		) {

		return AbstractCollection.extend({

			model: LessonModel,

            dsResourceName: 'skill',

			serverPath: function() {
				return '/hierarchy/lessons/skill/' + this.meta('skill_id');
			}

		});

	}
);
