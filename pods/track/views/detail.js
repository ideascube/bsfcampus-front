define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

        'pods/skill/collections/track',
        'pods/attempts/track-validation-attempt/model',

        'pods/track/views/trackOutlineItem',
        'pods/attempts/track-validation-attempt/view',

        'text!pods/track/templates/detail.html',

		'less!pods/track/styles/detail'
	],
	function($, _, Backbone, Config,
            SkillTrackCollection, TrackValidationAttemptModel,
            TrackOutlineItem, TrackValidationAttemptView,
            detailTemplate
		) {

		return Backbone.View.extend({

			className: 'row gutter-sm track-detail',

			template: _.template(detailTemplate),

            events: {
                'click .btn-validate-track': 'startTrackValidation'
            },

            render: function() {
				var trackModel = this.model.forTemplate();

                var html = this.template({track: trackModel, config: Config});
                this.$el.html(html);

                this.$validateButton = this.$('.btn-validate-track');

                if (this.model.get('is_validated'))
                {
                    this.$el.addClass('track-validated');
                    this.$validateButton.removeClass('btn-success').addClass('btn-info golden-effect');
                }
                else if (this.model.get('progress').current >= this.model.get('progress').max)
                {

                }
                else
                {
                    this.$validateButton.prop('disabled', true);
                }

                if (this.model.get('validation_test') == null) {
                    //this.$validateButton.hide();
                }

                var self = this;

                var skillsCollection = DS.filter(Config.constants.dsResourceNames.SKILLS, function(skillModel) {
                    return _.some(trackModel.skills, function (skill) {
                        return skill._id == skillModel.id;
                    })
                });
                var areSkillsIncomplete = _.some(skillsCollection.models, function(skillModel) {
                    return DS.isIncomplete(Config.constants.dsResourceNames.SKILLS, skillModel.id);
                });
                if (!areSkillsIncomplete && skillsCollection.length > 0)
                {
                    this.renderSkills(skillsCollection);
                }
                else
                {
                    skillsCollection = new SkillTrackCollection();
                    skillsCollection.meta('track_id', this.model.id);
                    skillsCollection.fetch().then(function(){
                        DS.inject(Config.constants.dsResourceNames.SKILLS, skillsCollection.models);
                        _.each(skillsCollection.models, function(skillModel) {
                            DS.setComplete(Config.constants.dsResourceNames.SKILLS, skillModel.id, true);
                        });
                        self.renderSkills(skillsCollection);
                    });
                }

				return this;
			},

            renderSkills: function (skillsCollection) {
                this.$('#track-outline').empty();
                _.each(skillsCollection.models, this.renderOne, this);
            },

            renderOne: function(skill) {
				var trackOutlineItem = new TrackOutlineItem({model: skill});
				trackOutlineItem.render();
				this.$('#track-outline').append(trackOutlineItem.$el);
			
				return this;
			},

            startTrackValidation: function(e) {
                e.preventDefault();

                var self = this;

                var attempt = new TrackValidationAttemptModel();
                var validationTest = this.model.get('validation_test')._id;
                attempt.set('exercise', validationTest);
                attempt.save().done(function(result) {
                    var $modal = $('#modal');
                    var exerciseAttemptView = new TrackValidationAttemptView({
                        model: attempt,
                        el: $modal
                    });
                    exerciseAttemptView.resource = self.model;
                    exerciseAttemptView.render();
                    exerciseAttemptView.continueExercise();
                    $("#main").hide();
                    $("body").css('background-color', '#36404A');
                    $modal.on('hidden.bs.modal', function () {
                        var validated = self.model.get('is_validated');
                        if (!validated && exerciseAttemptView.isExerciseCompleted)
                        {
                            self.model.set('is_validated', true);
                        }
                        self.render();
                        if (exerciseAttemptView.trackValidationId != null) {
                            Backbone.history.loadUrl("/prompt_track_validation/" + exerciseAttemptView.trackValidationId);
                        }
                        $modal.unbind('hidden.bs.modal');
                        $("#main").show();
                        $("body").css('background-color', '');
                    });
                    $modal.modal('show');
                }).fail(function(error) {

                });
            }

		});

	}
);
