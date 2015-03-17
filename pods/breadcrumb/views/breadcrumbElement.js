define(
	[
		'jquery',
		'underscore',
		'backbone',

		'pods/breadcrumb/model',
		'text!pods/breadcrumb/templates/breadcrumb-element.html',
		'pods/track/model',
		'pods/skill/model',
		'pods/resource/model'
	],
	function($, _, Backbone,
		BreadcrumbModel,
		breadcrumbElementTemplate,
		TrackModel,
		SkillModel,
		ResourceModel
		) {

		return Backbone.View.extend({

			model: BreadcrumbModel,
			
			tagName: 'li',

			template: _.template(breadcrumbElementTemplate),

			render: function() {
				console.log('this.model', this.model);
				if (this.model.track_id != undefined)
				{
					var track = new TrackModel({_id: this.model.track_id});
					this.model['url'] = track.route();
				}
				else if (this.model.skill_id != undefined)
				{
					var skill = new SkillModel({_id: this.model.skill_id});
					this.model['url'] = skill.route();
				}
				else if (this.model.resource_id != undefined)
				{
					var resource = new ResourceModel({_id: this.model.resource_id});
					this.model['url'] = resource.route();
				}

				var html = this.template({breadcrumb: this.model});
				this.$el.html(html);
				
				return this;
			}
		});
		
	}
);
