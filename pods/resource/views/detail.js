define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'pods/resource/model',
		'pods/resource/content/model',
		'pods/skill/model',
		'pods/lesson/model',

		'pods/resource/content/view',
		
		'text!pods/resource/templates/detail.html',
	],
	function($, _, Backbone,
		ResourceModel,
		ResourceContentModel,
		SkillModel,
		LessonModel,
		ResourceContentView,
		detailTemplate
		) {

		var DetailView = Backbone.View.extend({

			model: ResourceModel,

			el: $('#container'),
			
			template: _.template(detailTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);

				// Skill hierarchy

				var hierarchy = $.get(this.model.hierarchyUrl())
					.done(
						function(data){
							console.log("Resource hierarchy fetched", data);
							var skillModel = new SkillModel(data.skill);
							console.log(skillModel);
						}
					);

				// Resource content

				var contentModel = new ResourceContentModel(this.model.get('resource_content'));
				var contentView = new ResourceContentView({model: contentModel});
				contentView.render();
				$('#resource-content').html(contentView.$el);

			},

		});

		return DetailView;
		
	}
);
