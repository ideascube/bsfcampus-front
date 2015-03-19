define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/resource/model',
		
		'text!pods/skill/templates/lesson-outline-item.html',
		'app/config'
	],
	function($, _, Backbone,
		ResourceModel,
		lessonOutlineItemTemplate,
		Config
		) {

		return Backbone.View.extend({

			model: ResourceModel,
			
			tagName: 'div',
			
			className: 'resource clearfix',

			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate(), config: Config});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
