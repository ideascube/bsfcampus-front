define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-model'
	],
	function($, _, Backbone, AbstractModel) {

		return AbstractModel.extend({

			jsonKey: "resource",

			urlRoot: function() {
				return this.serverGateway + '/resources';
			},

			url: function() {
				return this.urlRoot() + '/' + this.id;
			},

			route: function() {
				return '#/resource/' + this.id;
			}

		});

	}
);
