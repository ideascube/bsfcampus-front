define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model'
	],
	function($, _, Backbone, Config, 
		AbstractModel
		) {

		return AbstractModel.extend({

			serverPath: '/hierarchy/tracks',

            dsResourceName: Config.constants.dsResourceNames.TRACKS,

			route: function() {
				return '#/track/' + this.id;
			},

            forTemplate: function() {

                var son = AbstractModel.prototype.forTemplate.call(this); // equivalent to super.forTemplate()

                son.iconUrl = son.icon_url;

                return son;
            }

		});

	}
);
