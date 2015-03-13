define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-model'
	],
	function($, _, Backbone, AbstractModel) {

		return AbstractModel.extend({

			jsonKey: "skill",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/skills';
			},

			url: function() {
				return this.urlRoot() + '/' + this.id;
			},

			route: function() {
				return '#/skill/' + this.id;
			}

		});

	}
);
