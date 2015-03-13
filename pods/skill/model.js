define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {

		return Backbone.Model.extend({
			urlRoot: 'http://localhost:5000/hierarchy/skills',

			url: function() {
				return this.urlRoot + '/' + this.id;
			},

			idAttribute: '_id',

			parse: function(response, options) {
				if (options.collection) { 
					// Anything to do?
				} else {
					response = response.skill;
				}
				response._id = response._id['$oid'];
				return response;
			},

			route: function() {
				return '#/skill/' + this.id;
			},

			forTemplate: function() {
				var son = this.toJSON();
				son.route = this.route();
				return son;
			}

		});

	}
);
