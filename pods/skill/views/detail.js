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
		'text!pods/skill/templates/validation-badge.html',

		'less!pods/skill/style'
	],
	function($, _, Backbone, Config,
		TrackModel, LessonSkillCollection, ResourceLessonCollection, SkillValidationAttemptModel,
		SkillOutlineItemView, LessonOutlineItemView, BackToTrackView, SkillValidationAttemptView,
	 	detailTemplate, badgeHTML
		) {

		return Backbone.View.extend({

			className: 'skill-detail row gutter-sm',
			
			template: _.template(detailTemplate),

			events: {
				'click .btn-validate-skill': 'startSkillValidation'
			},

            render: function() {

                var skillModel = this.model.forTemplate();
                var html = this.template({
					skill: skillModel,
					config:Config
				});
				this.$el.html(html);
				if (this.model.get('is_validated')) {
					this.$el.addClass('skill-validated');
					this.$('.skill-title').append(badgeHTML);
					this.$('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-info golden-effect');
					this.$('.btn-validate-skill').removeClass('btn-success').addClass('btn-info golden-effect');
				}

				var self = this;

                DS.find(Config.constants.dsResourceNames.TRACKS, this.model.get('track')['_id']).then(function (trackModel) {
					var backToTrackView = new BackToTrackView({model: trackModel});
					self.$('#track-title').html(backToTrackView.render().$el);
                });

                var lessonsCollection = DS.filter(Config.constants.dsResourceNames.LESSONS, function(lessonModel) {
                    return _.some(skillModel.lessons, function (lesson) {
                        return lesson._id == lessonModel.id;
                    })
                });
                var areLessonsIncomplete = _.some(lessonsCollection.models, function(lessonModel) {
                    return DS.isIncomplete(Config.constants.dsResourceNames.LESSONS, lessonModel.id);
                });
                if (!areLessonsIncomplete && lessonsCollection.length > 0)
                {
                    this.renderLessons(lessonsCollection);
                }
                else
                {
                    lessonsCollection = new LessonSkillCollection();
                    lessonsCollection.meta('skill_id', this.model.id);
                    lessonsCollection.fetch().then(function(){
                        DS.inject(Config.constants.dsResourceNames.LESSONS, lessonsCollection.models);
                        _.each(lessonsCollection.models, function(lessonModel) {
                            DS.setComplete(Config.constants.dsResourceNames.LESSONS, lessonModel.id, true);
                        });
                        self.renderLessons(lessonsCollection);
                    });
                }

				return this;
			},

            renderLessons: function (lessonsCollection) {
                this.$('#skill-outline').empty();

                var self =this;
                lessonsCollection.each(function (lesson, index, list) {
                    self.renderSingleLesson(lesson);
                })
            },

			renderSingleLesson: function(lesson) {
				var skillOutlineItemView = new SkillOutlineItemView({model: lesson});
                this.$('#skill-outline').append(skillOutlineItemView.render().$el);
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
					$modal.html(exerciseAttemptView.$el);
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
