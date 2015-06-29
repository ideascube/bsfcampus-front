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

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/lessons';
			},

			route: function() {
				return '#/lesson/' + this.id;
			},

		});

	}
);
