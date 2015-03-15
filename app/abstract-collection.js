define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {

		return Backbone.Collection.extend({

			// #FIXME: This parameter should be externalized in a static config file
			serverGateway: 'http://localhost:5000',

			parse: function(response, options) {
				return response[this.jsonKey];
			},

		});

	}
);