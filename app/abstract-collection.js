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

            fetch: function() {
                var self = this;
                return new Promise(function (resolve, reject) {
                    var collectionInDS = DS.getAll(self.dsResourceName);
                    if (collectionInDS != null) {
                        resolve(collectionInDS);
                    }
                    else {
                        Backbone.Collection.prototype.fetch.call(self).done(function (result) {
                            var collection = new self.constructor(result, {parse: true});
                            DS.inject(self.dsResourceName, collection.models);
                            resolve(collection);
                        }).fail(function (err) {
                            reject(err);
                        });
                    }
                });
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