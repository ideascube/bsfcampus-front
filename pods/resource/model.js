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
