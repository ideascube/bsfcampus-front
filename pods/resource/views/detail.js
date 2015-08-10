define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'pods/resource/collections/skill',
		'pods/resource/collections/lesson',
		'pods/resource/views/backToMainResourceNav',
		'pods/resource/views/skillNav',
		'text!pods/resource/templates/detail.html',

		'pods/resource/content/model',
		'pods/resource/content/view',
        'pods/resource/views/lessonOutlineItem',

		'pods/skill/model',

		'pods/lesson/model',
		'pods/lesson/collections/skill',
		
		'less!pods/resource/style'
	],
	function($, _, Backbone, Config,
		ResourceModel, ResourcesSkillCollection, ResourcesLessonCollection, BackToMainResourceNav, SkillNavView, detailTemplate,
		ResourceContentModel, ResourceContentView, LessonOutlineItemView,
		SkillModel,
		LessonModel, LessonsSkillCollection
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			className: 'resource-detail row gutter-sm',
			
			template: _.template(detailTemplate),

            render: function() {
				var html = this.template({
					resource: this.model.forTemplate(),
					config: Config
				});
				this.$el.html(html);

                if (this.model.get('is_additional'))
                {
                    this.renderBackToMainResource();
                    this.$('#additional-resources-block').hide();
                }
                else
                {
                    this.renderHierarchy();
                    this.renderAdditionalResources();
                }
                this.renderContent();
			},

            renderBackToMainResource: function() {
                var parentResourceModel = new ResourceModel({data: this.model.get('parent_resource')}, {parse: true});
                var backToMainResourceNav = new BackToMainResourceNav({model: parentResourceModel});
                backToMainResourceNav.render();
                this.$('#skill-nav').html(backToMainResourceNav.$el);

            },

			renderHierarchy: function() {

				var self = this;

                // TODO: optimize with DataStore (DS)
				$.get(this.model.hierarchyUrl()).done(function(data){
					var skillModel = new SkillModel({data: data.skill}, {parse: true});
					
					var resourcesModels = [];
					_.each(data.cousins, function(resource) {
						var resourceModel = new ResourceModel({data: resource}, {parse: true});
						resourcesModels.push(resourceModel);
					});
					var resourcesSkillCollection = new ResourcesSkillCollection(resourcesModels);

					var lessonsModels = [];
					_.each(data.aunts, function(lesson) {
						var lessonModel = new LessonModel({data: lesson}, {parse: true});
						var resources = resourcesSkillCollection.filter(function(resource) {
							return resource.get('parent')._id == lessonModel.id;
						});
						var resourcesCollection = new ResourcesLessonCollection(resources);
						lessonModel.set('resources', resourcesCollection);
						lessonsModels.push(lessonModel);
					});
					var lessonsSkillCollection = new LessonsSkillCollection(lessonsModels);

					skillModel.set('lessons', lessonsSkillCollection);

					var skillNavView = new SkillNavView({model: skillModel});
					skillNavView.currentResource = self.model;
					skillNavView.render();
					self.$('#skill-nav').html(skillNavView.$el);
				});

			},

			renderContent: function() {
				var contentView = new ResourceContentView({
					model: this.model,
					el: this.$('#resource-content')
				});
				contentView.render();
			},

            renderAdditionalResources: function () {
                var additionalResourcesRefs = this.model.get('additional_resources');

                if (additionalResourcesRefs.length > 0)
                {
                    this.$('#additional-resources-block').show();
                    this.$('#additional-resources').empty();
                    _.each(additionalResourcesRefs, this.renderSingleAdditionalResource, this);
                }
                else
                {
                    this.$('#additional-resources-block').hide();
                }
            },

            renderSingleAdditionalResource: function(additionalResource) {
                var additionalResourceModel = new ResourceModel({data: additionalResource}, {parse: true});
                var additionalResourcesView = new LessonOutlineItemView({model: additionalResourceModel});
                additionalResourcesView.render();
                this.$('#additional-resources').append(additionalResourcesView.$el);
            }

		});
		
	}
);
