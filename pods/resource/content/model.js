define(
	[
		'jquery',
		'underscore',
		'backbone'
	],
	function($, _, Backbone) {

		return Backbone.Model.extend({

			forTemplate: function() {
				var son = this.toJSON();
				return son;
			}

		});

	}
);
