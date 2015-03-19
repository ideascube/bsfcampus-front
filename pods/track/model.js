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
