define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',

		'pods/lesson/collections/skill',
		
		'pods/resource/collections/lesson',
		
		'pods/skill/views/skillOutlineItem',
		'pods/skill/views/lessonOutlineItem',
		'pods/skill/views/backToTrack',
		'text!pods/skill/templates/detail.html',
	],
	function($, _, Backbone, Config,
		TrackModel, 
		LessonSkillCollection,
		ResourceLessonCollection,
		SkillOutlineItemView, LessonOutlineItemView, BackToTrackView, detailTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(detailTemplate),

			render: function() {
				
				var skillModel = this.model.forTemplate();
				if (skillModel.is_validated)
				{
					skillModel.validateButtonText = "Test de compétence validé";
					skillModel.validateButtonStatus = "validated";
					skillModel.validateButtonClass = "disabled";
				}
				else
				{
					skillModel.validateButtonText = "Passer le test de compétence";
					skillModel.validateButtonStatus = "validate-allowed";
				}
				
				var html = this.template({skill: skillModel, config:Config});
				var bgColor = this.model.get('bg_color');
				$('body')
					.css('background-color', bgColor)
					.css('background-image', "url('" + this.model.get('bg_image_url') + "')")
					.css('background-repeat', 'no-repeat')
					.css('background-size', '100%')
					.css('background-position', 'center bottom')
					.css('background-attachment', 'fixed');
				this.$el.html(html);

				var self = this;

				var trackModel = new TrackModel({_id: this.model.get('track')});
				trackModel.fetch().done(function(){
					var backToTrackView = new BackToTrackView({model: trackModel});
					backToTrackView.render();
					$('#track-title').html(backToTrackView.$el);
				});

				var lessonsCollection = new LessonSkillCollection();
				lessonsCollection.meta('skill_id', this.model.id);
				lessonsCollection.fetch().then(function(){
					$('#skill-outline').html('');

					for (var i=0; i < lessonsCollection.models.length; i++)
					{
						self.renderLesson(lessonsCollection.models[i]);
						if (i < lessonsCollection.models.length-1)
						{
							$('#skill-outline').append('<hr>');
						}
					}
				});
			
				return this;
			},

			renderLesson: function(lesson) {
				var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
				skillOutlineItemView.render();
				$('#skill-outline').append(skillOutlineItemView.$el);
			},

		});
		
	}
);
