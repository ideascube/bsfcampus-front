define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'pods/resource/model',
		'text!pods/resource/templates/back-to-main-resource-nav.html'

	],
	function($, _, Backbone, Config,
		ResourceModel, backToResourceNavTemplate
		) {

		return Backbone.View.extend({

			model: ResourceModel,

			className: 'panel',
			
			template: _.template(backToResourceNavTemplate),

			render: function() {
				var html = this.template({resource: this.model.toJSON(true)});
				this.$el.html(html);

				return this;
			}

		});
		
	}
);
