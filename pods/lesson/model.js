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

			jsonKey: "lesson",

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/lessons';
			},

			route: function() {
				return '#/lesson/' + this.id;
			},

		});

	}
);
