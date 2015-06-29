define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',
		'pods/lesson/collections/skill',
		'pods/resource/collections/lesson',
		'pods/attempts/skill-validation-attempt/model',
		
		'pods/skill/views/skillOutlineItem',
		'pods/skill/views/lessonOutlineItem',
		'pods/skill/views/backToTrack',
		'pods/attempts/skill-validation-attempt/view',

		'text!pods/skill/templates/detail.html',

		'less!pods/skill/style'
	],
	function($, _, Backbone, Config,
		TrackModel, LessonSkillCollection, ResourceLessonCollection, SkillValidationAttemptModel,
		SkillOutlineItemView, LessonOutlineItemView, BackToTrackView, SkillValidationAttemptView,
	 	detailTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(detailTemplate),

			events: {
				'click .btn-validate-skill': 'startSkillValidation'
			},

			render: function() {
				
				var skillModel = this.model.forTemplate();
				if (skillModel.is_validated)
				{
					skillModel.validateButtonText = Config.stringsDict.SKILL_TEST_VALIDATED;
					skillModel.validateButtonStatus = "validated";
                    skillModel.validationClass = 'validated';
				}
				else
				{
					skillModel.validateButtonText = Config.stringsDict.SKILL_TEST_VALIDATION_ALLOWED;
					skillModel.validateButtonStatus = "validate-allowed";
                    skillModel.validationClass = '';
                }
				
				var html = this.template({skill: skillModel, config:Config});
				this.$el.html(html);

				var self = this;

				var trackModel = new TrackModel(this.model.get('track'));
				trackModel.fetch().done(function(){
					var backToTrackView = new BackToTrackView({model: trackModel});
					backToTrackView.render();
					$('#track-title').html(backToTrackView.$el);
				});

				var lessonsCollection = new LessonSkillCollection();
				lessonsCollection.meta('skill_id', this.model.id);
				lessonsCollection.fetch().then(function(){
					$('#skill-outline').empty();

					lessonsCollection.each(function(lesson, index, list){
						self.renderLesson(lesson);
						if (index < list.length - 1) {
							$('#skill-outline').append('<hr>');
						}
					})
				});
			
				return this;
			},

			renderLesson: function(lesson) {
				var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
				skillOutlineItemView.render();
				$('#skill-outline').append(skillOutlineItemView.$el);
			},

			startSkillValidation: function(e) {
				e.preventDefault();

				var self = this;

				var attempt = new SkillValidationAttemptModel();
				attempt.set('skill', this.model.id);
				attempt.save().done(function(result) {
					var exerciseAttemptView = new SkillValidationAttemptView({model: attempt});
					exerciseAttemptView.resource = self.model;
					exerciseAttemptView.render();
					var $modal = $('#modal');
					var $modalDialog = $modal.find('.modal-dialog');
					$modalDialog.html(exerciseAttemptView.$el);
					$modal.modal({show: true});
					$modal.on('hidden.bs.modal', function () {
						var validated = self.model.get('is_validated');
						if (!validated && exerciseAttemptView.isExerciseCompleted)
						{
							Backbone.history.loadUrl(Backbone.history.getFragment());
						}
					});
				}).fail(function(error) {

				});
			}

		});
		
	}
);
