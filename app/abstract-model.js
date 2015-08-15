define(
	[
		'jquery',
		'underscore',
		'backbone',
        'ds',
		'app/config',

		'pods/analytics/processAchievement'
	],
	function($, _, Backbone, DS, Config) {

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
				
					return _.map(obj, function(value) {
                        return this.recursiveNormalize(value);
                    }, this);


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
					return _.object(
                        _.map(obj, function(value, key) {
                            return [key, this.recursiveNormalize(value)];
                        }, this)
                    );

				} else {

					return obj;

				}
			},

			toJSON: function(forTemplate) {
                var json = Backbone.Model.prototype.toJSON.call(this);
				if (forTemplate === true) {
					json.id = json._id;
					json.route = _.result(this, 'route', null);
				}
				return json;
			},

			serverPath: '',

			urlRoot: function () {
				return Config.constants.serverGateway + _.result(this, 'serverPath', '');
			}

		});

	}
);