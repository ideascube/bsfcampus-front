define(
	[
		'jquery',
		'underscore',
		'backbone',
		'text!pods/track/templates/list.html',
		'text!pods/track/templates/list-item.html'
	],
	function($, _, Backbone, listTemplate, listItemTemplate) {

		var ListItemView = Backbone.View.extend({

			tagName: 'div',

			template: _.template(listItemTemplate),

			render: function() {
				var html = this.template({track: this.model.forTemplate()});
				this.$el.html(html);
				return this;
			},

		});

		var ListView = Backbone.View.extend({

			el: $('#container'),

			template: _.template(listTemplate),

			render: function() {
				$("body").removeAttr("style");
				this.$el.html(this.template());
				_.each(this.collection.models, this.renderOne, this);
				return this; // convenient for chained calls
			},

			renderOne: function(track) {
				var listItemView = new ListItemView({model: track});
				listItemView.render();
				$('#track-list').append(listItemView.$el);
				return this; // convenient for chained calls
			},

		});

		return ListView;
		
	}
);
