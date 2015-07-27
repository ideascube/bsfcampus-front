define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/static-page/template.html',

		'less!pods/track/styles/list'
	],
	function($, _, Backbone, Config,
		staticPageTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',

			className: 'static-page',

			template: _.template(staticPageTemplate),

			render: function() {
				$("body").removeAttr("style");
				this.$el.html(this.template({content: this.model.forTemplate()}));
				
				return this;
			}

		});
		
	}
);
