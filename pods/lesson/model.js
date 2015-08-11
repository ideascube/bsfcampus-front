define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',
	],
	function($, _, Backbone, Config,
		AbstractModel
		) {

		return AbstractModel.extend({

			serverPath: '/hierarchy/lessons',

            dsResourceName: Config.constants.dsResourceNames.LESSONS,

			route: function() {
				return '#/lesson/' + this.id;
			}

		});

	}
);
