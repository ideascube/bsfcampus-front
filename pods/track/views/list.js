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
				console.log(this.model);
				var html = this.template({track: this.model.forTemplate()});
				this.$el.html(html);
				return this;
			},

		});

		var ListView = Backbone.View.extend({

			el: $('#container'),

			template: _.template(listTemplate),

			render: function() {
				this.$el.html(this.template());
				_.each(this.collection.models, this.renderOne, this);
			},

			renderOne: function(track) {
				var listItemView = new ListItemView({model: track});
				listItemView.render();
				$('#track-list').append(listItemView.$el);
			},

		});

		return ListView;
		
	}
);
