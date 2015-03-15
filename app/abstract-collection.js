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

			initialize: function() {
				this._meta = {};
			},

			 meta: function(prop, value) {
				if (value === undefined) {
					return this._meta[prop];
				} else {
					this._meta[prop] = value;
				}
			},

			parse: function(response, options) {
				if (options) {
					if (options.jsonKey) {
						return response[options.jsonKey];
					}
				}
				
				return response[this.jsonKey];
			},

		});

	}
);