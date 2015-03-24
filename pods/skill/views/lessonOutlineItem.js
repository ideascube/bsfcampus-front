define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/resource/model',
		
		'text!pods/skill/templates/lesson-outline-item.html',
	],
	function($, _, Backbone, Config,
		ResourceModel,
		lessonOutlineItemTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,
			
			tagName: 'div',
			
			className: 'resource clearfix',

			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var resourceModelJSON = this.model.forTemplate();
				switch (resourceModelJSON.resource_content._cls) {
					case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.RICH_TEXT;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
					case Config.stringsDict.RESOURCE_TYPE.VIDEO:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.VIDEO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.EXERCISE;
						break;
					case Config.stringsDict.RESOURCE_TYPE.AUDIO:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.AUDIO;
						break;
					case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
						resourceModelJSON.iconUrl = Config.imagesDict.resourceIcon.DOWNLOADABLE_FILE;
						break;
				}
				var html = this.template({resource: resourceModelJSON});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
