define(
	[
		'jquery',
		'underscore',
		'backbone',
		
		'pods/resource/model',
		
		'text!pods/resource/templates/lesson-outline-item.html',
	],
	function($, _, Backbone,
		ResourceModel,
		lessonOutlineItemTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			tagName: 'a',

			className: 'list-group-item',

			attributes: function() {
				return {
					'href': this.model.route()
				}
			},
			
			template: _.template(lessonOutlineItemTemplate),

			render: function() {
				var html = this.template({resource: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			},

		});
		
	}
);
