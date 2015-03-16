define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/track/views/trackOutlineItem',
		
		'pods/skill/collections/track',

		'text!pods/track/templates/detail.html',
	],
	function($, _, Backbone,
		TrackOutlineItem,
		SkillTrackCollection,
		detailTemplate
		) {

		return Backbone.View.extend({

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var trackModel = this.model.forTemplate();
				// #TODO: depending on the availability of the test, change the button text and class
				// trackModel.validateButtonText = "Passer le test du parcours";
				// trackModel.validateButtonStatus = "validate-disabled";
				// trackModel.validateButtonText = "Passer le test du parcours";
				// trackModel.validateButtonStatus = "validate-allowed";
				trackModel.validateButtonText = "Test du parcours validé";
				trackModel.validateButtonStatus = "validated";
				var html = this.template({track: trackModel});
				$("body").css("background", "#e9e9e9 url('" + this.model.get('bg_image_url') + "') no-repeat")
					.css("background-size", "100%")
					.css("background-position", "0% 100%")
					.css("background-attachment", "fixed");
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
