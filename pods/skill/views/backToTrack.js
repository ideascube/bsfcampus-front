define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/skill/templates/back-to-track.html',
	],
	function($, _, Backbone, Config,
		backToTrackTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(backToTrackTemplate),

			render: function() {
				var html = this.template({track: this.model.toJSON(true), config: Config});
				this.$el.html(html);
				
				return this;
			}

		});
		
	}
);