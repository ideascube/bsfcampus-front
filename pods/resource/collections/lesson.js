define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-collection',
		'pods/resource/model',
	],
	function($, _, Backbone, AbstractCollection, ResourceModel) {

		return AbstractCollection.extend({

			model: ResourceModel,

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
				return this.serverGateway + '/resources/lesson';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('lesson_id');
			},

			parse: function(response) {
				return response.resources; 
			}

		});

	}
);
