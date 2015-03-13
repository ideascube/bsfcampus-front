define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {

		return Backbone.Model.extend({

			// #FIXME: This parameter should be externalized in a static config file
			serverGateway: 'http://localhost:5000',

			idAttribute: '_id',

			parse: function(response, options) {
				console.log("parse", this);
				console.log(this.jsonKey, response);
				console.log(options);
				if (options.collection) { 
					// Anything to do?
				} else {
					response = response[this.jsonKey];
				}
				response = this.recursiveNormalize(response);
				console.log("before return response", response);
				return response;
			},

			recursiveNormalize: function(obj) {

				// console.log("recursiveNormalize " + obj);
				
				// Normalize the payload to convert BSON to JSON.
				// Go through the entire object recursively, 
				// and transform special types (ObjectId, Date) to strings.

				if (obj.constructor === Array) {
				// If this is an array, normalize each element
				
					// console.log("Array");

					var normalizedArray = [];
					for (var i = 0 ; i < obj.length; i++) {
						normalizedArray[i] = this.recursiveNormalize(obj[i]);
					}
					return normalizedArray;


				} else if (obj.constructor === Object) {
				// If this is an object, normalize each element

					// console.log("Object");
					
					var keys = Object.keys(obj);

					// console.log(keys);

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
						// console.log("key = " + key);
						normalizedObj[key] = this.recursiveNormalize(obj[key]);
						// console.log("after : " + normalizedObj);
					}
					return normalizedObj;

				} else {

					// console.log("Value");

					return obj;

				}
			},

			forTemplate: function() {
				var son = this.toJSON();
				son.route = this.route();
				return son;
			}

		});

	}
);