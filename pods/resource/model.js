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
			
			jsonKey: "resource",
			
			urlRoot: function() {
				return this.serverGateway + '/resources';
			},

			hierarchyUrl: function() {
				return this.url() + '/hierarchy';
			},

			route: function() {
				return '#/resource/' + this.id;
			},

		});

	}
);
