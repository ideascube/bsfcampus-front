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

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);

				$("body").css("background", this.model.get('bg_color') + " url('" + this.model.get('bg_image_url') + "') no-repeat")
					.css("background-size", "100%")
					.css("background-position", "0% 100%")
					.css("background-attachment", "fixed");

				this.renderHierarchy();
				this.renderContent();
			},

			renderHierarchy: function() {

				var self = this;

				var hierarchy = $.get(this.model.hierarchyUrl()).done(function(data){
					var parsedSkill = new SkillModel().parse(data);
					var skillModel = new SkillModel(parsedSkill);

					var resourcesModels = [];
					_.each(data.cousins, function(resource) {
						var parsedResource = new ResourceModel().parse({resource: resource});
						var resourceModel = new ResourceModel(parsedResource);
						resourcesModels.push(resourceModel);
					});
					var resourcesSkillCollection = new ResourcesSkillCollection(resourcesModels);

					var lessonsModels = [];
					_.each(data.aunts, function(lesson) {
						var parsedLesson = new LessonModel().parse({lesson: lesson});
						var lessonModel = new LessonModel(parsedLesson);
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

				var contentModel = new ResourceContentModel(this.model.get('resource_content'));
				var contentView = new ResourceContentView({model: contentModel});
				contentView.render();
				this.$el.find('#resource-content').html(contentView.$el);

			},

		});
		
	}
);
