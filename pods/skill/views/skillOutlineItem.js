define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/lesson/model',

		'pods/resource/collections/lesson',

		'pods/skill/views/lessonOutlineItem',
		'text!pods/skill/templates/skill-outline-item.html',
	],
	function($, _, Backbone, Config,
		LessonModel, 
		ResourceLessonCollection,
		LessonOutlineItemView, skillOutlineItemTemplate
		) {

		return Backbone.View.extend({

			model: LessonModel,
			
			tagName: 'div',
			
			className: 'lesson clearfix',

			template: _.template(skillOutlineItemTemplate),

			render: function() {
				var html = this.template({lesson: this.model.forTemplate()});
				this.$el.html(html);
				
				var self = this;

                // TODO: optimize these requests with DataStore
                var resourcesCollection = new ResourceLessonCollection();
				resourcesCollection.meta('lesson_id', this.model.id);
				resourcesCollection.fetch().then(function(){
					self.$el.find('.lesson-outline').html('');
					_.each(resourcesCollection.models, self.renderResource, self);
				});

				return this;
			},

			renderResource: function(resource) {
				var lessonOutlineItemView = new LessonOutlineItemView({model: resource});
				lessonOutlineItemView.render();
				this.$el.find('.lesson-outline').append(lessonOutlineItemView.$el);
			
				return this;
			},

		});
		
	}
);
