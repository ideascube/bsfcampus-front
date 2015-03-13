define(
	[
		'jquery',
		'underscore',
		'backbone',
		'pods/skill/model',
	],
	function($, _, Backbone, SkillModel) {

		return Backbone.Collection.extend({

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

			url: function() {
				return 'http://localhost:5000/hierarchy/skills/track/' + this.meta('track_id');
			},

			parse: function(response) {
				return response.skills;
			}

		});

	}
);
