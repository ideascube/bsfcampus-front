define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',
		'text!pods/track/templates/list-item.html',
	],
	function($, _, Backbone, Config,
		TrackModel, listItemTemplate
		) {

		return Backbone.View.extend({

			model: TrackModel,

			tagName: 'div',

			template: _.template(listItemTemplate),

			render: function() {
				var html = this.template({track: this.model.forTemplate(), config: Config});
				this.$el.html(html);

				var bgColor = '#e9e9e9';
				if (this.model.get('bg_color') != null) {
					bgColor = this.model.get('bg_color');
				}
				this.$el.find('.track-thumbnail')
					.css("background-color", bgColor)
					.css("background-image", "url('" + this.model.get('image_tn_url') + "')")
					.css("background-repeat", "no-repeat")
					.css("background-size", "100%")
					.css("background-position", "center bottom")
				
				return this;
			},

		});
		
	}
);
