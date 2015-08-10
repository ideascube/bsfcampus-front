define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',
		'text!pods/track/templates/list-item.html'
	],
	function($, _, Backbone, Config,
		TrackModel, listItemTemplate
		) {

		return Backbone.View.extend({

			model: TrackModel,

			className: 'col-sm-6',

			template: _.template(listItemTemplate),

			render: function() {
                var trackSon = this.model.forTemplate();
				var html = this.template({
					track: this.model.forTemplate(),
					config: Config
				});
				this.$el.html(html);

				if (this.model.get('is_validated'))
				{
					this.$('.track-thumbnail').addClass('track-validated panel-info');
					this.$('.track-thumbnail .panel-heading').addClass('golden-effect');
					this.$('.track-thumbnail .btn-start').removeClass('btn-bordered').addClass('btn-info golden-effect');
				}
				else if (this.model.get('is_started'))
				{
					this.$('.track-thumbnail').addClass('track-started panel-primary');
					this.$('.track-thumbnail .btn-start').removeClass('btn-bordered').addClass('btn-primary');
				}

				return this;
			}

		});
		
	}
);
