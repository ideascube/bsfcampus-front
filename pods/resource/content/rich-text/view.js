define(
	[
		'jquery',
		'underscore',
		'backbone',
		'viewmanager',
		'app/config',

		'text!pods/resource/content/rich-text/template.html'
	],
	function ($, _, Backbone, VM, Config,
			  template) {

		return Backbone.View.extend({

			template: _.template(template),

			render: function () {
				var html = this.template({
					resource: this.model.forTemplate(),
					config: Config
				});
				this.$el.html(html);

				return this;
			}

		});

	}
);
