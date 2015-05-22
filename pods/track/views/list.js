define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/views/trackListItem',
		'text!pods/track/templates/list.html',

		'less!pods/track/styles/list',
	],
	function($, _, Backbone, Config,
		ListItemView, listTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',

			id: 'track-list-container',

			template: _.template(listTemplate),

			render: function() {
				$("body").removeAttr("style");
				this.$el.html(this.template());
				_.each(this.collection.models, this.renderTrack, this);
				
				return this;
			},

			renderTrack: function(track) {
				var listItemView = new ListItemView({model: track});
				listItemView.render();
				this.$el.find('#track-list').append(listItemView.$el);
				
				return this;
			},

		});
		
	}
);
