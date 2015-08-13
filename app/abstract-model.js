define(
	[
		'jquery',
		'underscore',
		'backbone',
        'ds',
		'app/config',

		'pods/analytics/processAchievement'
	],
	function($, _, Backbone, DS, Config,
			 processAchievement) {

		return Backbone.Model.extend({

			idAttribute: '_id',

			achievements: null,

			parse: function(response, options) {
				options || (options = {});

				if (response.hasOwnProperty('achievements')) {
					this.achievements = new Backbone.Collection(this.recursiveNormalize(response.achievements));
				}

				if (!options.collection) {
					var jsonKey = options.jsonKey || this.jsonKey || 'data';
					response = response[jsonKey];
				}

				response = this.recursiveNormalize(response);

				return response;
			},

			recursiveNormalize: function(obj) {

				// Normalize the payload to convert BSON to JSON.
				// Go through the entire object recursively, 
				// and transform special types (ObjectId, Date) to strings.

				if (obj === null) {
					return null;
				}

				if (obj.constructor === Array) {
				// If this is an array, normalize each element
				
					var normalizedArray = [];
					for (var i = 0 ; i < obj.length; i++) {
						normalizedArray[i] = this.recursiveNormalize(obj[i]);
					}
					return normalizedArray;


				} else if (obj.constructor === Object) {
				// If this is an object, normalize each element

					var keys = Object.keys(obj);

					// Detect ObjectIds and Dates, then extract the relevant value.
					if (keys.length === 1) {
						if (keys[0] === "$oid") {
							return obj[keys[0]];
						} else if (keys[0] === "$date") {
							return obj[keys[0]];
						}
					}

					// If this was not a special type, proceed with all keys.
					var normalizedObj = {};
					for (var key in obj) {
						normalizedObj[key] = this.recursiveNormalize(obj[key]);
					}
					return normalizedObj;

				} else {

					return obj;

				}
			},

			forTemplate: function() {
				var son = this.toJSON();
				son.id = son._id;
				if (typeof this.route === "function") {
					son.route = this.route();
				}
				return son;
			},

			serverPath: '',

			urlRoot: function () {
				return Config.constants.serverGateway + _.result(this, 'serverPath', '');
			}

		});

	}
);