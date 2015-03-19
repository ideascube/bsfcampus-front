define(
	[
		'jquery',
		'underscore',
		'backbone',

		'text!pods/track/templates/track-outline-item.html',
		'app/config'
	],
	function($, _, Backbone,
		trackOutlineItemTemplate,
		Config
		) {

		return Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(trackOutlineItemTemplate),

			render: function() {
				var skillModel = this.model.forTemplate();
				console.log("skillModel.is_validated", skillModel.is_validated);
				skillModel.validationClass = (skillModel.is_validated) ? 'validated' : '';
				var html = this.template({skill: skillModel, config: Config});
				this.$el.html(html);
				
				return this;
			}
		});

	}
);
