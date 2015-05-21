define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!app/footer/template.html',
		'app/config'
	],
	function($, _, Backbone, template, Config) {

		return Backbone.View.extend({

			el: $('#footer'),

			template: _.template(template),

			render: function() {
				this.$el.html(this.template({config: Config}));
			}

		});
		
	}
);
