define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'pods/resource/model',
		'pods/resource/collections/lesson',
		'pods/resource/views/skillOutlineItem',

		'pods/skill/model',

		'pods/lesson/model',
		'pods/lesson/collections/skill',
		
		'text!pods/resource/templates/skill-nav.html',
		'pods/resource/views/back-to-skill'
	],
	function($, _, Backbone,
		ResourceModel, ResourcesLessonCollection, SkillOutlineItemView,
		SkillModel,
		LessonModel, LessonsSkillCollection,
		skillNavTemplate, BackToSkillView
		) {

		return Backbone.View.extend({

			model: SkillModel,

			tagName: 'div',
			
			template: _.template(skillNavTemplate),

			render: function() {
				var html = this.template({skill: this.model.forTemplate()});
				this.$el.html(html);
					
				var backToSkillView = new BackToSkillView({model: this.model});
				backToSkillView.render();
				console.log("backToSkillView.$el", backToSkillView.$el.html());
				console.log("$('#resource-skill-title')", $('#resource-skill-title'));
				this.$el.find('#resource-skill-title').html(backToSkillView.$el);

				_.each(this.model.get('lessons').models, this.renderLesson, this);

				return this;
			},

			renderLesson: function(lesson) {
				var itemView = new SkillOutlineItemView({model: lesson});
				itemView.currentResource = this.currentResource;
				itemView.render();
				this.$el.find('#resource-skill-outline').append(itemView.$el);
			
				return this;
			},

		});
		
	}
);
