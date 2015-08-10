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
				_.each(this.model, function(element, index, list) {
					var renderedElement = this.getRenderedElement(element);
					if (index == list.length - 1)
					{
						var currentHTML = renderedElement.$('a').html();
						renderedElement.$el.html(currentHTML);
						renderedElement.$el.addClass('active');
					}
					this.$el.append(renderedElement.$el);
				}, this);

				return this;
			},

			getRenderedElement: function(breadcrumbInfo) {
				var breadcrumbElementView = new BreadcrumbElementView({model: breadcrumbInfo});
				breadcrumbElementView.render();
			
				return breadcrumbElementView;
			}

		});

	}
);
