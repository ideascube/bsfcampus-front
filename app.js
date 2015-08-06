require.config({

	paths: {
		jquery: 'vendor/jquery/dist/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		jqueryui: 'vendor/jquery-ui/jquery-ui',
        jqueryserialize: 'vendor/jQuery.serializeObject/jquery.serializeObject',
        viewmanager: 'scripts/vm',
		form2js: 'vendor/form2js/src/form2js',
		text: 'vendor/requirejs-text/text',
		less: 'vendor/require-less/less',
		lessc: 'vendor/require-less/lessc',
		normalize: 'vendor/require-less/normalize',
		bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
        projekktor: 'vendor/projekktor/dist/projekktor',
        ds: 'lib/backbone-ds',

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
        'jqueryserialize': {
            deps: ['jquery']
        },
		'bootstrap': {
			deps: ['jquery']
		},
        'projekktor': {
            deps: ['jquery']
        }
	},

	less: {
		async: true
	},

    waitSeconds: 0

});

require(
	['app/main', 'bootstrap'],
	function(App, BS) {
		App.initialize();
	}
);