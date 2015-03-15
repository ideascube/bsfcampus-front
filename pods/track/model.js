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

			jsonKey: "track",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/tracks';
			},

			route: function() {
				return '#/track/' + this.id;
			}

		});

	}
);
