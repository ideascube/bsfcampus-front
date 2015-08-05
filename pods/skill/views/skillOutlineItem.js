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

                var resourcesCollection = DS.filter(Config.constants.dsResourceNames.RESOURCE, function(model) {
                    if (model.get('parent')._cls == 'Lesson')
                    {
                        return model.get('parent')._id === self.model.id;
                    }
                    else
                    {
                        return false;
                    }
                });
                if (resourcesCollection.length > 0)
                {
                    this.renderResources(resourcesCollection);
                }
                else
                {
                    resourcesCollection = new ResourceLessonCollection();
                    resourcesCollection.meta('lesson_id', this.model.id);
                    resourcesCollection.fetch().then(function(){
                        DS.inject(Config.constants.dsResourceNames.RESOURCE, resourcesCollection.models);
                        self.renderResources(resourcesCollection);
                    });
                }

				return this;
			},

            renderResources: function (resourcesCollection) {
                this.$el.find('.lesson-outline').html('');
                _.each(resourcesCollection.models, this.renderResource, this);
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
