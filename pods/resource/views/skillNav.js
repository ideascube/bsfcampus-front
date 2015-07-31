define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/collections/lesson',
		'pods/resource/views/skillOutlineItem',
		'pods/resource/views/back-to-skill',
		'text!pods/resource/templates/skill-nav.html',

		'pods/skill/model',

		'pods/lesson/model',
		'pods/lesson/collections/skill',
		
	],
	function($, _, Backbone, Config,
		ResourceModel, ResourcesLessonCollection, SkillOutlineItemView, BackToSkillView, skillNavTemplate,
		SkillModel,
		LessonModel, LessonsSkillCollection
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
				this.$el.find('#resource-skill-title').html(backToSkillView.$el);

				_.each(this.model.get('lessons').models, this.renderSingleLesson, this);

				return this;
			},

			renderSingleLesson: function(lesson) {
				var itemView = new SkillOutlineItemView({model: lesson});
				itemView.currentResource = this.currentResource;
				itemView.render();
				this.$el.find('#resource-skill-outline').append(itemView.$el);
			
				return this;
			},

		});
		
	}
);
