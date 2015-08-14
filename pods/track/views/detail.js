define(
	[
		'jquery',
		'underscore',
		'backbone',
        'viewmanager',
		'app/config',

        'pods/skill/collections/track',
        'pods/attempts/track-validation-attempt/model',

        'pods/track/views/trackOutlineItem',
        'pods/attempts/track-validation-attempt/view',

        'text!pods/track/templates/detail.html',

		'less!pods/track/styles/detail'
	],
	function($, _, Backbone, VM, Config,
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

            initialize: function() {
                this.listenTo(this.model, 'change', this.render);
            },

            render: function() {
				var trackModel = this.model.forTemplate();

                var html = this.template({track: trackModel, config: Config});
                this.$el.html(html);

                this.$validateButton = this.$('.btn-validate-track');

                if (this.model.isValidated())
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
				this.$('#track-outline').append(trackOutlineItem.render().$el);
			
				return this;
			},

            startTrackValidation: function(e) {
                e.preventDefault();

                var self = this;

                var attempt = new TrackValidationAttemptModel();
                // FIXME Handle case where there is no validation test
                var validationTest = this.model.get('validation_test')._id;
                attempt.set('exercise', validationTest);
                attempt.save().done(function(result) {
                    var trackValidationAttemptView = VM.createView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT, function() {
                        return new TrackValidationAttemptView({model: attempt});
                    });
                    trackValidationAttemptView.resource = self.model;
                    $("body").append(trackValidationAttemptView.render().$el);

                    trackValidationAttemptView.$el.on('shown.bs.modal', function () {
                        trackValidationAttemptView.continueExercise();
                        $("#main").hide();
                        $("body").css('background-color', '#36404A');
                    }).on('hidden.bs.modal', function () {
                        $("body").css('background-color', '');
                        $("#main").show();
                        VM.closeView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT);
                    }).modal('show');
                }).fail(function(error) {

                });
            }

		});

	}
);
