define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/breadcrumb/model',
		'text!pods/breadcrumb/templates/breadcrumb-element.html',

		'pods/track/model',

		'pods/skill/model',

		'pods/lesson/model',

		'pods/resource/model'
	],
	function($, _, Backbone, Config,
		BreadcrumbModel, breadcrumbElementTemplate,
		TrackModel,
		SkillModel,
		LessonModel,
		ResourceModel
		) {

		return Backbone.View.extend({

			model: BreadcrumbModel,
			
			tagName: 'li',

			template: _.template(breadcrumbElementTemplate),

			render: function() {
				switch (this.model._cls) {
					case 'Track':
						this.model = new TrackModel({data: this.model}, {parse: true});
						break;
					case 'Skill':
						this.model = new SkillModel({data: this.model}, {parse: true});
						break;
					case 'Lesson':
						this.model = new LessonModel({data: this.model}, {parse: true});
						break;
					default:
						var suffix = 'Resource';
						var className = this.model._cls;
						if (className.indexOf(suffix, className.length - suffix.length) !== -1) {
							this.model = new ResourceModel({data: this.model}, {parse: true});
							break;
						}
						return;
				}

				var html = this.template({model: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
