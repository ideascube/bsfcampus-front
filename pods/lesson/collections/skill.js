define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-collection',
		'pods/lesson/model',
	],
	function($, _, Backbone, AbstractCollection, LessonModel) {

		return AbstractCollection.extend({

			model: LessonModel,

			initialize: function() {
				this._meta = {};
			},

			meta: function(prop, value) {
				if (value === undefined) {
					return this._meta[prop];
				} else {
					this._meta[prop] = value;
				}
			},

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/lessons/skill';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('skill_id');
			},

			parse: function(response) {
				return response.lessons; 
			}

		});

	}
);
