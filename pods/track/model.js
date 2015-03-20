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

			jsonKey: "track",

			urlRoot: function() {
				return Config.constants.serverGateway + '/hierarchy/tracks';
			},

			route: function() {
				return '#/track/' + this.id;
			}

		});

	}
);
