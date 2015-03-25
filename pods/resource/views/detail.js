define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/collections/skill',
		'pods/resource/collections/lesson',
		'pods/resource/views/skillNav',
		'text!pods/resource/templates/detail.html',

		'pods/resource/content/model',
		'pods/resource/content/view',

		'pods/skill/model',

		'pods/lesson/model',
		'pods/lesson/collections/skill',
		
	],
	function($, _, Backbone, Config,
		ResourceModel, ResourcesSkillCollection, ResourcesLessonCollection, SkillNavView, detailTemplate,
		ResourceContentModel, ResourceContentView,
		SkillModel,
		LessonModel, LessonsSkillCollection
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			tagName: 'div',
			
			template: _.template(detailTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				var bgColor = this.model.get('bg_color');
				$('body')
					.css('background-color', bgColor)
					.css('background-image', "url('" + this.model.get('bg_image_url') + "')")
					.css('background-repeat', 'no-repeat')
					.css('background-size', '100%')
					.css('background-position', 'center bottom')
					.css('background-attachment', 'fixed');
				this.$el.html(html);

				this.renderHierarchy();
				this.renderContent();
			},

			renderHierarchy: function() {

				var self = this;

				var hierarchy = $.get(this.model.hierarchyUrl()).done(function(data){
					var skillModel = new SkillModel(data, {parse: true});
					
					var resourcesModels = [];
					_.each(data.cousins, function(resource) {
						var resourceModel = new ResourceModel({resource: resource}, {parse: true});
						resourcesModels.push(resourceModel);
					});
					var resourcesSkillCollection = new ResourcesSkillCollection(resourcesModels);

					var lessonsModels = [];
					_.each(data.aunts, function(lesson) {
						var lessonModel = new LessonModel({lesson: lesson}, {parse: true});
						var resources = resourcesSkillCollection.where({'lesson': lessonModel.id});
						var resourcesCollection = new ResourcesLessonCollection(resources);
						lessonModel.set('resources', resourcesCollection);
						lessonsModels.push(lessonModel);
					});
					var lessonsSkillCollection = new LessonsSkillCollection(lessonsModels);

					skillModel.set('lessons', lessonsSkillCollection);

					var skillNavView = new SkillNavView({model: skillModel});
					skillNavView.currentResource = self.model;
					skillNavView.render();
					self.$el.find('#skill-nav').html(skillNavView.$el);
				});

			},

			renderContent: function() {

				var contentView = new ResourceContentView({model: this.model});
				contentView.render();
				this.$el.find('#resource-content').html(contentView.$el);

			},

		});
		
	}
);
