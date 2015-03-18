define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/track/model',
		'pods/lesson/collections/skill',
		'pods/resource/collections/lesson',
		
		'pods/skill/views/skillOutlineItem',
		'pods/skill/views/lessonOutlineItem',
		'pods/skill/views/backToTrack',

		'text!pods/skill/templates/detail.html',
	],
	function($, _, Backbone,
		TrackModel, LessonSkillCollection, ResourceLessonCollection,
		SkillOutlineItemView, LessonOutlineItemView, BackToTrackView,
		detailTemplate
		) {

		return Backbone.View.extend({

			el: $('#container'),
			
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
				
				var html = this.template({skill: skillModel});
				this.$el.html(html);

				$("body").css("background", this.model.get('bg_color') + " url('" + this.model.get('bg_image_url') + "') no-repeat")
					.css("background-size", "100%")
					.css("background-position", "0% 100%")
					.css("background-attachment", "fixed");

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
					_.each(lessonsCollection.models, self.renderLesson, self);
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
