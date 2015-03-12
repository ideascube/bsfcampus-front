define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {

		return Backbone.Model.extend({
			// NOTE: We should introduce an application-wide extension of Backbone.Model
			// to take care of the BSON -> JSON parsing (id and dates mostly), maybe the forTemplate() method and some others.
			// eg: http://stackoverflow.com/questions/12390553/how-to-make-backbones-and-mongodbs-ids-work-seamlessly

			urlRoot: 'http://localhost:5000/hierarchy/tracks',

			idAttribute: '_id',

			parse: function(response) {
				response._id = response._id['$oid'];
				return response;
			},

			route: function() {
				return 'track/' + this.id;
			},

			forTemplate: function() {
				var son = this.toJSON();
				son.route = this.route();
				return son;
			}

		});

	}
);
