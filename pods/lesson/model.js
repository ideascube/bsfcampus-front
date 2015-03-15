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

			jsonKey: "lesson",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/lessons';
			},

			route: function() {
				return '#/lesson/' + this.id;
			},

		});

	}
);
