define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/resource/content/baseView',

		'text!pods/resource/content/external-video/templates/youtube.html'
	],
	function ($, _, Backbone, Config,
			  ResourceContentBaseView,
			  youtubeTemplate) {

		return ResourceContentBaseView.extend({

			template: function(args) {
				switch(this.model.get('resource_content').source) {
					case 'youtube':
						return _.template(youtubeTemplate)(args);
				}
				return "Unrecognized source";
			}

		});

	}
);
