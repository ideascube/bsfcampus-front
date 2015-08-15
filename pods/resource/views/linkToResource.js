define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'text!pods/resource/templates/link-to-resource.html',

	],
	function($, _, Backbone, Config,
		ResourceModel, linkToResourceTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			tagName: 'a',

			attributes: function() {
				return {
					'href': this.model.route()
				}
			},
			
			template: _.template(linkToResourceTemplate),

			render: function() {
				var resourceModelJSON = this.model.toJSON(true);
				switch (this.model.get('_cls').split('.').pop()) {
					case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
						resourceModelJSON.icon_url = Config.imagesDict.resourceIconWhite.RICH_TEXT;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
					case Config.stringsDict.RESOURCE_TYPE.VIDEO:
						resourceModelJSON.icon_url = Config.imagesDict.resourceIconWhite.VIDEO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
						resourceModelJSON.icon_url = Config.imagesDict.resourceIconWhite.EXERCISE;
						break;
					case Config.stringsDict.RESOURCE_TYPE.AUDIO:
						resourceModelJSON.icon_url = Config.imagesDict.resourceIconWhite.AUDIO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
						resourceModelJSON.icon_url = Config.imagesDict.resourceIconWhite.DOWNLOADABLE_FILE;
						break;
				}
				var html = this.template({resource: resourceModelJSON });
				this.$el.html(html);
				
				return this;
			}

		});
		
	}
);
