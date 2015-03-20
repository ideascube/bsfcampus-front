define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/resource/content/templates/rich-text.html',
		'text!pods/resource/content/templates/youtube-video.html',
		'text!pods/resource/content/templates/exercise.html',
	],
	function($, _, Backbone, Config,
		richTextTemplate, youtubeVideoTemplate, exerciseTemplate
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

			template: function(args) {
				var templateHTML = this.templateHTML();
				return _.template(templateHTML)(args);
			},
			
			render: function() {
				var html = this.template({content: this.model.forTemplate(), config: Config});
				this.$el.html(html);
			},

		});
		
	}
);
