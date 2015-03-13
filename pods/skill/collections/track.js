define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-collection',
		'pods/skill/model',
	],
	function($, _, Backbone, AbstractCollection, SkillModel) {

		return AbstractCollection.extend({

			model: SkillModel,

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
				return this.serverGateway + '/hierarchy/skills/track';
			},

			url: function() {
				return this.urlRoot() + '/' + this.meta('track_id');
			},

			parse: function(response) {
				return response.skills;
			}

		});

	}
);
