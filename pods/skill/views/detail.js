define(
	[
		'jquery',
		'underscore',
		'backbone',
        'viewmanager',
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
	function($, _, Backbone, VM, Config,
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

            initialize: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {

                var html = this.template({
					skill: this.model.toJSON(true),
					config: Config
				});
				this.$el.html(html);
				if (this.model.isValidated()) {
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
                    return _.some(self.model.get('lessons'), function (lesson) {
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
                lessonsCollection.each(function (lesson) {
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
                    var skillValidationAttemptView = VM.createView(Config.constants.VIEWS_ID.SKILL_VALIDATION_ATTEMPT, function() {
                        return new SkillValidationAttemptView({model: attempt});
                    });
					skillValidationAttemptView.resource = self.model;
					$("body").append(skillValidationAttemptView.render().$el);

                    skillValidationAttemptView.$el.on('hidden.bs.modal', function () {
                        VM.closeView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT);
					}).on('shown.bs.modal', function () {
                        skillValidationAttemptView.continueExercise();
                    }).modal('show');
				}).fail(function(error) {

				});
			}

		});
		
	}
);
