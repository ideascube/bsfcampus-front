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
				console.log("this.$el.find('.hierarchy-text a')", this.$el.find(".hierarchy-text a"));
				this.$el.find(".hierarchy-text a").addClass("start");
				
				return this;
			},

		});
		
	}
);
