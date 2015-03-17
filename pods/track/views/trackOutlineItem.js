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
				var skillModel = this.model.forTemplate();
				console.log("skillModel.is_validated", skillModel.is_validated);
				skillModel.validationClass = (skillModel.is_validated) ? 'validated' : '';
				var html = this.template({skill: skillModel});
				this.$el.html(html);
				
				return this;
			}
		});

	}
);
