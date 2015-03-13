define(
	[
		'jquery',
		'underscore',
		'backbone',
		'pods/skill/collections/track',
		'text!pods/track/templates/detail.html',
		'text!pods/track/templates/detail-skill-item.html'
	],
	function($, _, Backbone, SkillTrackCollection, detailTemplate, skillItemTemplate) {

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
				var html = this.template({track: this.model.forTemplate()});
				this.$el.html(html);

				var self = this;

				var skillsCollection = new SkillTrackCollection();
				skillsCollection.meta('track_id', this.model.id);
				skillsCollection.fetch().then(function(){
					$('#track-skills').html('');
					_.each(skillsCollection.models, self.renderOne, self);
				});
			},

			renderOne: function(skill) {
				var skillItemView = new SkillItemView({model: skill});
				skillItemView.render();
				$('#track-skills').append(skillItemView.$el);
			},

		});

		return DetailView;
		
	}
);
