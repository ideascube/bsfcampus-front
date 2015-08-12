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

		'pods/track/model',
		'pods/skill/model',

		'pods/lesson/model',
		'pods/lesson/collections/skill',
		
		'less!pods/resource/style'
	],
	function($, _, Backbone, Config,
		ResourceModel, ResourcesSkillCollection, ResourcesLessonCollection, BackToMainResourceNav, SkillNavView, detailTemplate,
		ResourceContentModel, ResourceContentView, LessonOutlineItemView,
        TrackModel, SkillModel, LessonModel, LessonsSkillCollection
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

                return this;
			},

            renderBackToMainResource: function() {
                var parentResourceModel = new ResourceModel({data: this.model.get('parent_resource')}, {parse: true});
                var backToMainResourceNav = new BackToMainResourceNav({model: parentResourceModel});
                this.$('#skill-nav').html(backToMainResourceNav.render().$el);

            },

            getWholeResourceHierarchyAndRenderSkillNav: function () {
                var self = this;

                $.get(this.model.hierarchyUrl()).done(function (data) {
                    var trackModel = new TrackModel({data: data.track}, {parse: true});
                    DS.inject(Config.constants.dsResourceNames.TRACKS, trackModel);
                    DS.setComplete(Config.constants.dsResourceNames.TRACKS, trackModel.id, true);

                    var skillModel = new SkillModel({data: data.skill}, {parse: true});
                    DS.inject(Config.constants.dsResourceNames.SKILLS, skillModel, {incomplete: false});
                    DS.setComplete(Config.constants.dsResourceNames.SKILLS, skillModel.id, true);

                    var resourcesModels = [];
                    _.each(data.cousins, function (resource) {
                        var resourceModel = new ResourceModel({data: resource}, {parse: true});
                        DS.inject(Config.constants.dsResourceNames.RESOURCES, resourceModel, {incomplete: false});
                        DS.setComplete(Config.constants.dsResourceNames.RESOURCES, resourceModel.id, true);
                        resourcesModels.push(resourceModel);
                    });
                    var resourcesSkillCollection = new ResourcesSkillCollection(resourcesModels);

                    var lessonsModels = [];
                    _.each(data.aunts, function (lesson) {
                        var lessonModel = new LessonModel({data: lesson}, {parse: true});
                        DS.inject(Config.constants.dsResourceNames.LESSONS, lessonModel, {incomplete: false});
                        DS.setComplete(Config.constants.dsResourceNames.LESSONS, lessonModel.id, true);
                        var resources = resourcesSkillCollection.filter(function (resource) {
                            return resource.get('parent')._id == lessonModel.id;
                        });
                        var resourcesCollection = new ResourcesLessonCollection(resources);
                        lessonModel.set('resources', resourcesCollection.toJSON());
                        lessonsModels.push(lessonModel);
                    });
                    var lessonsSkillCollection = new LessonsSkillCollection(lessonsModels);

                    skillModel.set('lessons', lessonsSkillCollection.toJSON());

                    self.renderSkillNav(skillModel);
                });
            },

            renderHierarchy: function() {
                console.log("renderHierarchy");

                var self = this;

                // First, get the resource's grand-parent skill
                var parentSkillId = this.model.get('hierarchy')[1]._id;
                DS.find(Config.constants.dsResourceNames.SKILLS, parentSkillId).then(function (parentSkillModel) {
                    // Second, find lessons for the parent skill
                    var skillModelSON = parentSkillModel.forTemplate();
                    var lessonsCollection = DS.getMany(Config.constants.dsResourceNames.LESSONS, _.pluck(skillModelSON.lessons, '_id'));
                    var areLessonsIncomplete = _.some(lessonsCollection.models, function(lessonModel) {
                        return DS.isIncomplete(Config.constants.dsResourceNames.LESSONS, lessonModel.id);
                    });
                    parentSkillModel.set('lessons', lessonsCollection.toJSON());

                    // Finally we get the children resources from all these lessons
                    var resourcesModels = [];
                    _.each(lessonsCollection.models, function(lessonModel) {
                        var lessonModelSON = lessonModel.forTemplate();
                        var resourcesCollection = DS.getMany(Config.constants.dsResourceNames.RESOURCES, _.pluck(lessonModelSON.resources, '_id'));
                        lessonModel.set('resources', resourcesCollection.toJSON());
                        resourcesModels.push.apply(resourcesModels, resourcesCollection.models);
                    });
                    var areResourcesIncomplete = _.some(resourcesModels, function(resourceModel) {
                        return DS.isIncomplete(Config.constants.dsResourceNames.RESOURCES, resourceModel.id);
                    });

                    // Now, if any of these data are incomplete, we get the whole hierarchy content
                    if (areLessonsIncomplete || areResourcesIncomplete)
                    {
                        self.getWholeResourceHierarchyAndRenderSkillNav();
                    }
                    else
                    {
                        self.renderSkillNav(parentSkillModel);
                    }
                });
			},

            renderSkillNav: function (skillModel) {
                var skillNavView = new SkillNavView({model: skillModel});
                skillNavView.currentResource = this.model;
                this.$('#skill-nav').html(skillNavView.render().$el);
            },

            renderContent: function() {
				var contentView = new ResourceContentView({
					model: this.model
				});
                this.$('#resource-content').html(contentView.render().$el);
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
                this.$('#additional-resources').append(additionalResourcesView.render().$el);
            }

		});
		
	}
);
