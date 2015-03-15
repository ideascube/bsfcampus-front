define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/skill/collections/track',

		'text!pods/track/templates/detail.html',
		'text!pods/track/templates/track-outline-item.html',
	],
	function($, _, Backbone,
		SkillTrackCollection,
		detailTemplate, skillItemTemplate
		) {

		var SkillItemView = Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(skillItemTemplate),

			render: function() {
				var html = this.template({skill: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}
		});

		var DetailView = Backbone.View.extend({

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var son = this.model.forTemplate();
				var html = this.template({track: son});
				$("body").css("background", "#e9e9e9 url('" + son.bgImageUrl + "') no-repeat")
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
				var skillItemView = new SkillItemView({model: skill});
				skillItemView.render();
				$('#track-outline').append(skillItemView.$el);
			
				return this;
			},

		});

		return DetailView;
		
	}
);
