define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!pods/skill/templates/back-to-track.html',
	],
	function($, _, Backbone, backToTrackTemplate) {

		return Backbone.View.extend({

			tagName: 'div',
			
			template: _.template(backToTrackTemplate),

			render: function() {
				var html = this.template({track: this.model.forTemplate()});
				this.$el.html(html);
				
				return this;
			}

		});
		
	}
);