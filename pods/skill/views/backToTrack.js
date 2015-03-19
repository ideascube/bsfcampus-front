define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!pods/skill/templates/back-to-track.html',
		'app/config'
	],
	function($, _, Backbone, backToTrackTemplate, Config) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(backToTrackTemplate),

			render: function() {
				var html = this.template({track: this.model.forTemplate(), config: Config});
				this.$el.html(html);
				
				return this;
			}

		});
		
	}
);