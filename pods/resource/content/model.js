define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
	],
	function($, _, Backbone, Config) {

		return Backbone.Model.extend({

			forTemplate: function() {
				var son = this.toJSON();
				return son;
			}

		});

	}
);
