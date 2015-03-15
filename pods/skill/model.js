define(
	[
		'jquery',
		'underscore',
		'backbone',

		'model',
	],
	function($, _, Backbone,
		AbstractModel
		) {

		return AbstractModel.extend({

			jsonKey: "skill",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/skills';
			},

			route: function() {
				return '#/skill/' + this.id;
			}

		});

	}
);
