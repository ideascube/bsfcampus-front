define(
	[
		'jquery',
		'underscore',
		'backbone',
		'viewmanager',
		'app/config',

		'text!pods/resource/content/external-video/templates/youtube.html'
	],
	function ($, _, Backbone, VM, Config,
			  youtubeTemplate) {

		return Backbone.View.extend({

			template: function(args) {
				switch(this.model.get('resource_content').source) {
					case 'youtube':
						return _.template(youtubeTemplate)(args);
				}
				return "Unrecognized source";
			},

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
