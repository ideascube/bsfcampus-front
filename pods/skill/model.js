define(
	[
		'jquery',
		'underscore',
		'backbone',

		'model',
		'app/config'
	],
	function($, _, Backbone,
		AbstractModel, Config
		) {

		return AbstractModel.extend({

			jsonKey: "skill",

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/skills';
			},

			route: function() {
				return '#/skill/' + this.id;
			}

		});

	}
);
