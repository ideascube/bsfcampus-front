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

			route: function() {
				return '#/lesson/' + this.id;
			}

		});

	}
);
