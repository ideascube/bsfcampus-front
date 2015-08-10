define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/resource/model',
		
		'text!pods/skill/templates/lesson-outline-item.html',
	],
	function($, _, Backbone, Config,
		ResourceModel,
		lessonOutlineItemTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,
			
			className: 'resource row',

			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
