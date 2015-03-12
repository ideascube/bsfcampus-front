define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!app/header/template.html'
	],
	function($, _, Backbone, template) {

		return Backbone.View.extend({

			el: $('#header'),

			template: _.template(template),

			render: function() {
				this.$el.html(this.template());
			}

		});
		
	}
);
