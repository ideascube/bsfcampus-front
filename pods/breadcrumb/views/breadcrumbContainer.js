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
		'text!pods/breadcrumb/templates/breadcrumb-container.html',
	],
	function($, _, Backbone, Config,
		TrackModel,
		SkillModel,
		ResourceModel,
		BreadcrumbElementView, breadcrumbContainerTemplate
		) {

		return Backbone.View.extend({

			el: $('#breadcrumb-container'),
			
			template: _.template(breadcrumbContainerTemplate),

			render: function() {
				var html = this.template();
				console.log("BreadcrumbContainerView", html);
				this.$el.html(html);

				for (var i=0; i < this.model.length; i++)
				{
					element = this.renderElement(this.model[i]);
					if (i == this.model.length-1)
					{
						element.$el.find('a').addClass('active');
					}
				}

				return this;
			},

			renderElement: function(element) {
				console.log("renderElement", element);
				var breadcrumbElementView = new BreadcrumbElementView({model: element});
				breadcrumbElementView.render();
				this.$el.find('.breadcrumb').append(breadcrumbElementView.$el);
			
				return this;
			},

		});

	}
);
