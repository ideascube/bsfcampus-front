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

			jsonKey: 'lessons',

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/lessons/skill';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('skill_id');
			}

		});

	}
);
