require.config({

	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		text: 'lib/text',

		collection: 'app/abstract-collection',
		model: 'app/abstract-model',
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	}

});

require(
	['app/main'],
	function(App) {
		App.initialize();
	}
);