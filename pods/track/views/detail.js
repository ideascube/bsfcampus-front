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

			render: function() {
				var trackModel = this.model.forTemplate();
				if (trackModel.is_validated)
				{
					trackModel.validateButtonText = "Test du parcours validé";
					trackModel.validateButtonStatus = "validated";
					trackModel.validateButtonClass = "disabled";
				}
				else if (trackModel.progress.current >= trackModel.progress.max)
				{
					trackModel.validateButtonText = "Passer le test du parcours";
					trackModel.validateButtonStatus = "validate-allowed";
				}
				else
				{
					trackModel.validateButtonText = "Passer le test du parcours";
					trackModel.validateButtonStatus = "validate-disabled";
					trackModel.validateButtonClass = "disabled";
				}

				var html = this.template({track: trackModel, config: Config});
				this.$el.html(html);

				var self = this;

				var skillsCollection = new SkillTrackCollection();
				skillsCollection.meta('track_id', this.model.id);
				skillsCollection.fetch().then(function(){
					self.$el.find('#track-outline').html('');
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

            events: {
                'click .btn-start-exercise': 'startExercise'
            },

            startSkillValidation: function(e) {
                e.preventDefault();

                var self = this;

                var attempt = new TrackValidationAttemptModel();
                attempt.set('exercise', this.model.get('validation_test').id);
                attempt.save().done(function(result) {
                    var exerciseAttemptView = new TrackValidationAttemptView({model: attempt});
                    exerciseAttemptView.resource = self.model;
                    exerciseAttemptView.render();
                    var $modal = $('#modal-container');
                    $modal.html(exerciseAttemptView.$el);
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
