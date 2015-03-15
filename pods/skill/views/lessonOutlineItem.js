define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/resource/model',
		
		'text!pods/skill/templates/lesson-outline-item.html',
	],
	function($, _, Backbone,
		ResourceModel,
		lessonOutlineItemTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,
			
			tagName: 'div',
			
			className: 'resource clearfix',

			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
