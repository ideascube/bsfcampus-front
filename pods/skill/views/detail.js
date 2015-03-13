define(
	[
		'jquery',
		'underscore',
		'backbone',
		'pods/skill/views/backToTrack',
		'text!pods/skill/templates/detail.html',
		'pods/track/model'
	],
	function($, _, Backbone, BackToTrackView, detailTemplate, TrackModel) {

		var DetailView = Backbone.View.extend({

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var son = this.model.forTemplate();
				var html = this.template({skill: son});
				$("body").css("background", "#e9e9e9 url('" + son.bgImageUrl + "') no-repeat")
					.css("background-size", "100%")
					.css("background-position", "0% 100%")
					.css("background-attachment", "fixed");
				this.$el.html(html);

				var self = this;

				console.log("this.model.attributes", this.model.attributes);
				var trackModel = new TrackModel({_id: this.model.get('track_id')});
				trackModel.fetch().done(function(){
					var backToTrackView = new BackToTrackView({model: trackModel});
					backToTrackView.render();
				});

				// var skillsCollection = new SkillTrackCollection();
				// skillsCollection.meta('track_id', this.model.id);
				// skillsCollection.fetch().then(function(){
				// 	$('#track-skills').html('');
				// 	_.each(skillsCollection.models, self.renderOne, self);
				// });
			},

			// renderOne: function(skill) {
			// 	var skillItemView = new SkillItemView({model: skill});
			// 	skillItemView.render();
			// 	$('#track-skills').append(skillItemView.$el);
			// },

		});

		console.log("skillDetailView", DetailView);
		return DetailView;
		
	}
);
