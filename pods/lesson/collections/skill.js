define(
	[
		'jquery',
		'underscore',
		'backbone',

		'collection',
		
		'pods/lesson/model',
	],
	function($, _, Backbone,
		AbstractCollection,
		LessonModel
		) {

		return AbstractCollection.extend({

			model: LessonModel,

			jsonKey: 'lessons',

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/lessons/skill';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('skill_id');
			}

		});

	}
);
