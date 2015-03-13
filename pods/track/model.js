define(
	[
		'jquery',
		'underscore',
		'backbone',
		'abstract-model'
	],
	function($, _, Backbone, AbstractModel) {

		return AbstractModel.extend({

			jsonKey: "track",

			urlRoot: function() {
				return this.serverGateway + '/hierarchy/tracks';
			},

			url: function() {
				return this.urlRoot() + '/' + this.id;
			},

			route: function() {
				return '#/track/' + this.id;
			}

		});

	}
);
