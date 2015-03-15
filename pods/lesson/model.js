define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-model'
	],
	function($, _, Backbone, AbstractModel) {

		return AbstractModel.extend({

			jsonKey: "lesson",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/lessons';
			},

			url: function() {
				return this.urlRoot() + '/' + this.id;
			},

			route: function() {
				return '#/lesson/' + this.id;
			}

		});

	}
);
