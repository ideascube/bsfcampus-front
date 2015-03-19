define(
	[
		'jquery',
		'underscore',
		'backbone',

		'collection',
		
		'pods/lesson/model',
		'app/config'
	],
	function($, _, Backbone,
		AbstractCollection,
		LessonModel, Config
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
