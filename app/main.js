define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/router',
	],
	function($, _, Backbone, AppRouter) {

		return {
			initialize: function() {
				AppRouter.initialize();
			}
		};
		
	}
);
