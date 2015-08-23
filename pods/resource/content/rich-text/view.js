define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/resource/content/baseView',

		'text!pods/resource/content/rich-text/template.html'
	],
	function ($, _, Backbone, Config,
			  ResourceContentBaseView,
			  template) {

		return ResourceContentBaseView.extend({

			template: _.template(template)

		});

	}
);
