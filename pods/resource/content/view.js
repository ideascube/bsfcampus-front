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

		'pods/exercise-attempt/model',
		'pods/exercise-attempt/view',
	],
	function($, _, Backbone, Config,
		richTextTemplate, youtubeVideoTemplate, exerciseTemplate, audioTemplate,
		ExerciseAttemptModel, ExerciseAttemptView
		) {

		return Backbone.View.extend({

			tagName: 'div',

			templateHTML: function() {
				var content = this.model.get('resource_content');
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

			events: {
				'click .btn-start-exercise': 'startExercise',
			},

			startExercise: function(e) {
				e.preventDefault();

				var self = this;

				var attempt = new ExerciseAttemptModel();
				attempt.set('exercise', this.model.id);
				attempt.save().done(function(result) {
					console.log("Got response:", result);
					console.log("Created exercise attempt", attempt);
					var exerciseAttemptView = new ExerciseAttemptView({model: attempt});
					exerciseAttemptView.resource = self.model;
					exerciseAttemptView.render();
					$('#modal-container').html(exerciseAttemptView.$el);
					$('#modal-container').modal({show: true, backdrop: true});
				}).fail(function(error) {

				});
			}

		});
		
	}
);
