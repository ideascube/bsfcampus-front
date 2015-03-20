define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/views/lessonOutlineItem',
		'text!pods/resource/templates/skill-outline-item.html',
		
		'pods/lesson/model',
	],
	function($, _, Backbone, Config,
		ResourceModel, LessonOutlineItemView, skillOutlineItemTemplate,
		LessonModel
		) {

		return Backbone.View.extend({

			model: LessonModel,

			tagName: 'div',

			className: 'panel panel-default',

			id: function() {
				return 'lesson-' + this.model.id + '-outline';
			},
			
			template: _.template(skillOutlineItemTemplate),

			render: function() {
				var son = this.model.forTemplate();
				son.active = this.model.id === this.currentResource.get('lesson');
				var html = this.template({lesson: son, config: Config});
				this.$el.html(html);

				_.each(this.model.get('resources').models, this.renderResource, this);

				return this;
			},

			renderResource: function(resource) {
				var lessonOutlineItemView = new LessonOutlineItemView({model: resource});
				lessonOutlineItemView.render();
				if (this.currentResource.id === resource.id) {
					lessonOutlineItemView.$el.addClass('active');
				}
				
				this.$el.find('.lesson-outline').append(lessonOutlineItemView.$el);

				return this;
			},

		});
		
	}
);
