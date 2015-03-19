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
