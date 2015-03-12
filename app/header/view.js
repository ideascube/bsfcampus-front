define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!app/header/template.html'
	],
	function($, _, Backbone, headerTemplate) {

		return Backbone.View.extend({

			el: $('#header'),

			template: _.template(headerTemplate),

			render: function() {
				console.log("Rendering app header view");
				this.$el.html(this.template());
			}

		});
		
	}
);
