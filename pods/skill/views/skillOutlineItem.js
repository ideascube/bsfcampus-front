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

			className: 'lesson list-group-item container-fluid',

			template: _.template(skillOutlineItemTemplate),

            render: function() {
                var lessonModel = this.model.forTemplate();
                var html = this.template({lesson: lessonModel});
				this.$el.html(html);
				
				var self = this;

                var resourcesCollection = DS.filter(Config.constants.dsResourceNames.RESOURCE, function(resourceModel) {
                    return _.some(lessonModel.resources, function (resource) {
                        return resource._id == resourceModel.id;
                    });
                });
                var areResourcesIncomplete = _.some(resourcesCollection.models, function(resourceModel) {
                    return DS.isIncomplete(Config.constants.dsResourceNames.RESOURCE, resourceModel.id);
                });

                if (!areResourcesIncomplete && resourcesCollection.length > 0)
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
                this.$('.lesson-outline').empty();
                _.each(resourcesCollection.models, this.renderResource, this);
            },

            renderResource: function(resource) {
				var lessonOutlineItemView = new LessonOutlineItemView({model: resource});
				lessonOutlineItemView.render();
				this.$('.lesson-outline').append(lessonOutlineItemView.$el);
			
				return this;
			},

		});
		
	}
);
