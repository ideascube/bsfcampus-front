define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!pods/skill/templates/back-to-track.html',
	],
	function($, _, Backbone, backToTrackTemplate) {

		var BackToTrackView = Backbone.View.extend({

			el: $('#track-title'),
			
			template: _.template(backToTrackTemplate),

			render: function() {
				var son = this.model.forTemplate();
				var html = this.template({track: son});
				// #FIXME: use this.$el instead, but it's not working, I don't know why
				$('#track-title').html(html);
			}

		});

		return BackToTrackView;
		
	}
);