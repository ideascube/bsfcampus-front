define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/resource/templates/back-to-skill.html',
	],
	function($, _, Backbone, Config,
		backToSkillTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(backToSkillTemplate),

			render: function() {
				var html = this.template({skill: this.model.forTemplate(), config: Config});
				this.$el.html(html);
				
				return this;
			}

		});
		
	}
);