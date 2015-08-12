define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/views/lessonOutlineItem',
		'text!pods/resource/templates/skill-outline-item.html',
		
		'pods/lesson/model'
	],
	function($, _, Backbone, Config,
		ResourceModel, LessonOutlineItemView, skillOutlineItemTemplate,
		LessonModel
		) {

		return Backbone.View.extend({

			model: LessonModel,

			className: 'panel panel-default',
			
			template: _.template(skillOutlineItemTemplate),

			render: function() {
				var currentLesson = this.currentResource.get('parent');
                var html = this.template({
					lesson: this.model.forTemplate(),
					config: Config
				});
				this.$el.html(html);

				if (this.model.id === currentLesson._id) {
					this.$('.collapse').addClass('in');
					this.$('[data-toggle="collapse"]').attr('aria-expanded', 'true');
				}

                this.$('.lesson-outline').empty();
				_.each(this.model.get('resources'), this.renderResource, this);

				return this;
			},

			renderResource: function(resource) {
                var self = this;

                DS.find(Config.constants.dsResourceNames.RESOURCES, resource._id).then(function(resourceModel) {
                    var lessonOutlineItemView = new LessonOutlineItemView({model: resourceModel});
                    self.$('.lesson-outline').append(lessonOutlineItemView.render().$el);
                    if (self.currentResource.id === resource.id) {
                        lessonOutlineItemView.$el.addClass('active');
                    }

                });

				return this;
			}

		});
		
	}
);
