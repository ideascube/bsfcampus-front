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

			id: function() {
				return 'track-' + this.model.id;
			},

			template: _.template(listItemTemplate),

			render: function() {
				var html = this.template({track: this.model.forTemplate(), config: Config});
				this.$el.html(html);
				
				return this;
			},

		});
		
	}
);
