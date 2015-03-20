define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'pods/resource/model',
		
		'text!pods/resource/templates/lesson-outline-item.html',

		'app/config'
	],
	function($, _, Backbone,
		ResourceModel,
		lessonOutlineItemTemplate,
		Config
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			tagName: 'a',

			className: 'list-group-item media',

			attributes: function() {
				return {
					'href': this.model.route()
				}
			},
			
			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var resourceModelJSON = this.model.forTemplate();
				switch (resourceModelJSON.resource_content._cls) {
					case Config.stringsDict.RICH_TEXT_RESOURCE_TYPE:
						resourceModelJSON.iconUrl = Config.imagesDict.richTextIcon;
						break;
					case Config.stringsDict.EXTERNAL_VIDEO_RESOURCE_TYPE:
					case Config.stringsDict.VIDEO_RESOURCE_TYPE:
						resourceModelJSON.iconUrl = Config.imagesDict.videoIcon;
						break;
					case Config.stringsDict.EXERCISE_RESOURCE_TYPE:
						resourceModelJSON.iconUrl = Config.imagesDict.exerciseIcon;
						break;
					case Config.stringsDict.AUDIO_RESOURCE_TYPE:
						resourceModelJSON.iconUrl = Config.imagesDict.audioIcon;
						break;
				}
				var html = this.template({resource: resourceModelJSON });
				this.$el.html(html);
				
				return this;
			},

		});
		
	}
);
