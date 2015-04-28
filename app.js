require.config({

	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		jqueryui: 'lib/jquery-ui',
		form2js: 'lib/form2js/form2js',
		text: 'lib/text',
		less: 'lib/require-less/less',
		lessc: 'lib/require-less/lessc',
		normalize: 'lib/require-less/normalize',
		bootstrap: 'lib/bootstrap',

		collection: 'app/abstract-collection',
		model: 'app/abstract-model'
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'bootstrap': {
			deps: ['jquery']
		}
	},

	less: {
		async: true
	}

});

require(
	['app/main', 'bootstrap'],
	function(App, BS) {
		App.initialize();
	}
);