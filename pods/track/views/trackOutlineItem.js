define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/track/templates/track-outline-item.html',
	],
	function($, _, Backbone, Config,
		trackOutlineItemTemplate
		) {

		return Backbone.View.extend({
			
			tagName: 'div',

			template: _.template(trackOutlineItemTemplate),

			render: function() {
				var skillModel = this.model.forTemplate();
				skillModel.validationClass = (skillModel.is_validated) ? 'validated' : '';
				var html = this.template({skill: skillModel, config: Config});
				this.$el.html(html);
				
				return this;
			}
		});

	}
);
