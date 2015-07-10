define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
	],
	function($, _, Backbone, Config) {

		return Backbone.Collection.extend({

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
				if (!options) {
					options = {};
				}

				var jsonKey = options.jsonKey || this.jsonKey || 'data';
				return response[jsonKey];
			},

			serverPath: '',

			url: function () {
				var serverPath = '';
				if (typeof this.serverPath === "function") {
					serverPath = this.serverPath();
				} else if (typeof this.serverPath === "string") {
					serverPath = this.serverPath;
				}
				return Config.constants.serverGateway + serverPath;
			}

		});

	}
);