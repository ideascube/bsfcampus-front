define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!pods/resource/templates/back-to-skill.html',
		'app/config'
	],
	function($, _, Backbone, backToSkillTemplate, Config) {

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