define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',

		'pods/skill/model',

		'pods/resource/model',

		'pods/breadcrumb/views/breadcrumbElement',
	],
	function($, _, Backbone, Config,
		TrackModel,
		SkillModel,
		ResourceModel,
		BreadcrumbElementView
		) {

		return Backbone.View.extend({

			tagName: 'ol',

			id: 'resource-hierarchy-breadcrumb',

			className: 'breadcrumb',
			
			render: function() {
				for (var i = 0; i < this.model.length; i++)
				{
					element = this.getRenderedElement(this.model[i]);
					if (i == this.model.length - 1)
					{
						var currentHTML = element.$el.find('a').html();
						element.$el.html(currentHTML);
						element.$el.addClass('active');
					}
					this.$el.append(element.$el);
				}

				return this;
			},

			getRenderedElement: function(element) {
				var breadcrumbElementView = new BreadcrumbElementView({model: element});
				breadcrumbElementView.render();
			
				return breadcrumbElementView;
			},

		});

	}
);
