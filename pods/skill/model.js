define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',
	],
	function($, _, Backbone, Config,
		AbstractModel
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
