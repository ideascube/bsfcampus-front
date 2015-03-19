define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/track/model',
		'pods/skill/model',
		'pods/resource/model',
		'text!pods/breadcrumb/templates/breadcrumb-container.html',
		'pods/breadcrumb/views/breadcrumbElement'
	],
	function($, _, Backbone, TrackModel, SkillModel, ResourceModel, breadcrumbContainerTemplate, BreadcrumbElementView) {

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
