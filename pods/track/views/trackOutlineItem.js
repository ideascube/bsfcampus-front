define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/track/templates/track-outline-item.html',
		'text!pods/skill/templates/validation-badge.html'
	],
	function($, _, Backbone, Config,
		trackOutlineItemTemplate, badgeHTML
		) {

		return Backbone.View.extend({

			tagName: 'a',
			className: 'skill media',
			
			template: _.template(trackOutlineItemTemplate),

			render: function() {
				var html = this.template({
					skill: this.model.toJSON(true),
					config: Config
				});
				this.$el.html(html);
				this.$el.attr('href', this.model.route());
				if (this.model.isValidated()) {
					this.$el.addClass('skill-validated');
					this.$('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-info golden-effect');
					this.$('.skill-title').append(badgeHTML);
				}
				
				return this;
			}

		});

	}
);
