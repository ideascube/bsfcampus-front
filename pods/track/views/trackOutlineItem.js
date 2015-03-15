define(
	[
		'jquery',
		'underscore',
		'backbone',

		'text!pods/track/templates/track-outline-item.html',
	],
	function($, _, Backbone,
		trackOutlineItemTemplate
		) {

		return Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(trackOutlineItemTemplate),

			render: function() {
				var html = this.template({skill: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}
		});

	}
);
