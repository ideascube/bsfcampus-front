define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'pods/track/model',
		'text!pods/track/templates/list-item.html',
	],
	function($, _, Backbone, Config,
		TrackModel, listItemTemplate
		) {

		return Backbone.View.extend({

			model: TrackModel,

			tagName: 'div',

			id: function() {
				return 'track-' + this.model.id;
			},

			template: _.template(listItemTemplate),

			render: function() {
                var trackSon = this.model.forTemplate();
                var trackStatusClass = '';
                var btnText = Config.stringsDict.START_TRACK;
                if (trackSon.is_validated)
                {
                    trackStatusClass = 'validated';
                    btnText = Config.stringsDict.TRACK_VALIDATED;
                }
                else if (trackSon.is_started)
                {
                    trackStatusClass = 'started';
                    btnText = Config.stringsDict.RESUME_TRACK;
                }
				var html = this.template({track: trackSon, trackStatusClass: trackStatusClass, btnText: btnText, config: Config});
				this.$el.html(html);
				
				return this;
			},

		});
		
	}
);
