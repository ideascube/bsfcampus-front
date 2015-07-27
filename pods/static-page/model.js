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

			serverPath: '/static_page',

			route: function() {
				return '#/static_page/' + this.get('page_id');
			}

		});

	}
);
