require.config({

	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		text: 'lib/text',
		bootstrap: 'lib/bootstrap',

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
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}

});

require(
	['app/main', 'bootstrap'],
	function(App, BS) {
		App.initialize();
	}
);