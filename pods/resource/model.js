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
			
			jsonKey: "resource",
			
			urlRoot: function() {
				return Config.constants.serverGateway + '/resources';
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
