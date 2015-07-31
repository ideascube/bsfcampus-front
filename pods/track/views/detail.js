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

			tagName: 'div',

			className: 'track-info-container',

			id: function() {
				return 'track-info-' + this.model.id;
			},
			
			template: _.template(detailTemplate),

            events: {
                'click .btn-validate-track': 'startTrackValidation'
            },

			render: function() {
				var trackModel = this.model.forTemplate();
                if (this.model.get('is_validated'))
                {
                    trackModel.validateButtonText = Config.stringsDict.TRACK_TEST_VALIDATED;
                    trackModel.validateButtonStatus = "validated";
                }
                else if (this.model.get('progress').current >= this.model.get('progress').max)
                {
                    trackModel.validateButtonText = Config.stringsDict.TRACK_TEST_VALIDATION_ALLOWED;
                    trackModel.validateButtonStatus = "validate-allowed";
                }
                else
                {
                    trackModel.validateButtonText = Config.stringsDict.TRACK_TEST_VALIDATION_ALLOWED;
                    trackModel.validateButtonStatus = "validate-disabled";
                    trackModel.validateButtonClass = "disabled";
                }

				var html = this.template({track: trackModel, config: Config});
				this.$el.html(html);
                if (trackModel.validation_test == null) {
                    this.$el.find(".btn-validate-track").hide();
                }

				var self = this;

                // TODO: optimize these requests with DataStore
                var skillsCollection = new SkillTrackCollection();
				skillsCollection.meta('track_id', this.model.id);
				skillsCollection.fetch().then(function(){
					self.$el.find('#track-outline').empty();
					_.each(skillsCollection.models, self.renderOne, self);
				});

				return this;
			},

			renderOne: function(skill) {
				var trackOutlineItem = new TrackOutlineItem({model: skill});
				trackOutlineItem.render();
				this.$el.find('#track-outline').append(trackOutlineItem.$el);
			
				return this;
			},

            startTrackValidation: function(e) {
                e.preventDefault();

                var self = this;

                var attempt = new TrackValidationAttemptModel();
                var validationTest = this.model.get('validation_test')._id;
                attempt.set('exercise', validationTest);
                attempt.save().done(function(result) {
                    var exerciseAttemptView = new TrackValidationAttemptView({model: attempt});
                    exerciseAttemptView.resource = self.model;
                    exerciseAttemptView.render();
                    $("#container").hide();
                    $("body").css('background-color', '#36404A');
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
                        if (exerciseAttemptView.trackValidationId != null) {
                            Backbone.history.loadUrl("/prompt_track_validation/" + exerciseAttemptView.trackValidationId);
                        }
                        $modal.unbind('hidden.bs.modal');
                        $("#container").show();
                        $("body").css('background-color', '');
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
