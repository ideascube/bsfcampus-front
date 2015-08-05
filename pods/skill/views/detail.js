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

                DS.find(Config.constants.dsResourceNames.TRACK, this.model.get('track')['_id']).then(function (trackModel) {
					var backToTrackView = new BackToTrackView({model: trackModel});
					backToTrackView.render();
					self.$el.find('#track-title').html(backToTrackView.$el);
                });

                var lessonsCollection = DS.filter(Config.constants.dsResourceNames.LESSON, function(model) {
                    return model.get('skill')._id === self.model.id;
                });
                if (lessonsCollection.length > 0)
                {
                    this.renderLessons(lessonsCollection);
                }
                else
                {
                    lessonsCollection = new LessonSkillCollection();
                    lessonsCollection.meta('skill_id', this.model.id);
                    lessonsCollection.fetch().then(function(){
                        DS.inject(Config.constants.dsResourceNames.LESSON, lessonsCollection.models);
                        self.renderLessons(lessonsCollection);
                    });
                }

				return this;
			},

            renderLessons: function (lessonsCollection) {
                this.$el.find('#skill-outline').empty();

                var self =this;
                lessonsCollection.each(function (lesson, index, list) {
                    self.renderSingleLesson(lesson);
                    if (index < list.length - 1) {
                        self.$el.find('#skill-outline').append('<hr>');
                    }
                })
            },

			renderSingleLesson: function(lesson) {
				var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
				skillOutlineItemView.render();
                this.$el.find('#skill-outline').append(skillOutlineItemView.$el);
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
                            self.model.set('is_validated', true);
                        }
                        self.render();
					});

                    $modal.on('shown.bs.modal', function () {
                        exerciseAttemptView.continueExercise();
                    });
				}).fail(function(error) {

				});
			}

		});
		
	}
);
