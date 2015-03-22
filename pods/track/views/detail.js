define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/views/trackOutlineItem',
		'text!pods/track/templates/detail.html',
		
		'pods/skill/collections/track',
	],
	function($, _, Backbone, Config,
		TrackOutlineItem, detailTemplate,
		SkillTrackCollection
		) {

		return Backbone.View.extend({

			tagName: 'div',
			
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
				var bgColor = '#e9e9e9';
				$('body')
					.css('background-color', bgColor)
					.css('background-image', "url('" + this.model.get('bg_image_url') + "')")
					.css('background-repeat', 'no-repeat')
					.css('background-size', '100%')
					.css('background-position', 'center bottom')
					.css('background-attachment', 'fixed');
				this.$el.html(html);

				var self = this;

				var skillsCollection = new SkillTrackCollection();
				skillsCollection.meta('track_id', this.model.id);
				skillsCollection.fetch().then(function(){
					$('#track-outline').html('');
					_.each(skillsCollection.models, self.renderOne, self);
				});

				return this;
			},

			renderOne: function(skill) {
				var trackOutlineItem = new TrackOutlineItem({model: skill});
				trackOutlineItem.render();
				$('#track-outline').append(trackOutlineItem.$el);
			
				return this;
			},

		});

	}
);
