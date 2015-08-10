define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/collections/lesson',
		'pods/resource/views/skillOutlineItem',
		'pods/resource/views/backToSkill',
		'text!pods/resource/templates/skill-nav.html',

		'pods/skill/model'
		
	],
	function($, _, Backbone, Config,
		ResourceModel, ResourcesLessonCollection, SkillOutlineItemView, BackToSkillView, skillNavTemplate,
		SkillModel
		) {

		return Backbone.View.extend({

			model: SkillModel,

			className: 'panel panel-default',
			
			template: _.template(skillNavTemplate),

			render: function() {
				var html = this.template({skill: this.model.forTemplate()});
				this.$el.html(html);
					
				var backToSkillView = new BackToSkillView({model: this.model});
				backToSkillView.render();
				this.$('#resource-skill-title').html(backToSkillView.$el);

				this.$('#resource-hierarchy-accordion').empty();
				_.each(this.model.get('lessons').models, this.renderSingleLesson, this);

				return this;
			},

			renderSingleLesson: function(lesson) {
				var itemView = new SkillOutlineItemView({model: lesson});
				itemView.currentResource = this.currentResource;
				itemView.render();
				this.$('#resource-hierarchy-accordion').append(itemView.$el);
			
				return this;
			}

		});
		
	}
);
