define(
	[
		'jquery',
		'underscore',
		'backbone',

		'text!pods/resource/content/templates/rich-text.html',
		'text!pods/resource/content/templates/youtube-video.html',
		'text!pods/resource/content/templates/exercise.html',
		'app/config'
	],
	function($, _, Backbone,
		richTextTemplate, youtubeVideoTemplate, exerciseTemplate, Config
		) {

		return Backbone.View.extend({

			tagName: 'div',

			templateHTML: function() {
				switch(this.model.get('_cls')) {
					case 'RichTextResourceContent':
						return richTextTemplate;
					case 'ExternalVideoResourceContent':
						switch(this.model.get('source')) {
							case 'youtube':
								return youtubeVideoTemplate;
						}
					case 'ExerciseResourceContent':
						return exerciseTemplate;
					default:
						return 'Unrecognized resource type.';
				}
			},

			template: function(data){
				var templateHTML = this.templateHTML({});
				return _.template(templateHTML)(data);
			},
			
			render: function() {
				var html = this.template({content: this.model.forTemplate({config: Config})});
				this.$el.html(html);
			},

		});
		
	}
);
