require.config({

	paths: {
		jquery: 'vendor/jquery/dist/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		jqueryui: 'vendor/jquery-ui/jquery-ui',
		jqueryui-touch-punch: 'vendor/jquery-ui-touch-punch-amd',
	        jqueryserialize: 'vendor/jquery-serialize-object/jquery.serialize-object',
		text: 'vendor/requirejs-text/text',
		less: 'vendor/require-less/less',
		lessc: 'vendor/require-less/lessc',
		normalize: 'vendor/require-less/normalize',
		bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
		videojs: 'vendor/video.js/dist/video-js/video',

		viewmanager: 'scripts/vm',
		collection: 'app/abstract-collection',
		model: 'app/abstract-model',
		view: 'app/abstract-view',

		resourcesCollection: 'pods/resource/collections/all',
		lessonsCollection: 'pods/lesson/collections/all',
		skillsCollection: 'pods/skill/collections/all',
		tracksCollection: 'pods/track/collection'
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
                'jqueryui-touch-punch': {
                        deps: ['jquery', 'jqueryui'],
                        exports: "$" 
                },
	        'jqueryserialize': {
  	 		deps: ['jquery']
        	},
		'bootstrap': {
			deps: ['jquery']
		},
        	'videojs': {
            		deps: ['jquery']
        	}
	},

	less: {
		async: true
	},

    waitSeconds: 0

});

require(['app/main', 'bootstrap']);
