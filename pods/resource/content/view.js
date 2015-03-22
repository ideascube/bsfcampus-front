define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/resource/content/templates/rich-text.html',
		'text!pods/resource/content/templates/youtube-video.html',
		'text!pods/resource/content/templates/exercise.html',
		'text!pods/resource/content/templates/audio.html',
		'text!pods/resource/content/templates/video.html',
	],
	function($, _, Backbone, Config,
		richTextTemplate, youtubeVideoTemplate, exerciseTemplate, audioTemplate, videoTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',

			templateHTML: function() {
				var content = this.model.get('resource_content');
				console.log("content._cls", content._cls);
				switch(content._cls) {
					case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
						return richTextTemplate;
					case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
						switch(content.source) {
							case 'youtube':
								return youtubeVideoTemplate;
						}
					case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
						return exerciseTemplate;
					case Config.stringsDict.RESOURCE_TYPE.AUDIO:
						return audioTemplate;
					case Config.stringsDict.RESOURCE_TYPE.VIDEO:
						return videoTemplate;
					default:
						return 'Unrecognized resource type.';
				}
			},

			template: function(args) {
				var templateHTML = this.templateHTML();
				return _.template(templateHTML)(args);
			},
			
			render: function() {
				var html = this.template({resource: this.model.forTemplate(), config: Config});
				this.$el.html(html);
			},

		});
		
	}
);
