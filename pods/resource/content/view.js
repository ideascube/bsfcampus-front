define(
	[
		'jquery',
		'underscore',
		'backbone',
        'viewmanager',
		'app/config',

		'pods/resource/content/audio/view',
		'pods/resource/content/downloadable-file/view',
		'pods/resource/content/exercise/view',
		'pods/resource/content/rich-text/view',
		'pods/resource/content/video/view'
	],
	function($, _, Backbone, VM, Config,
			 AudioView, DownloadableFileView, ExerciseView, RichTextView, VideoView
		) {

		return function (options) {
			if (options.hasOwnProperty('model')) {
				switch (options.model.get('_cls').split('.').pop()) {
					case Config.stringsDict.RESOURCE_TYPE.AUDIO:
						return new AudioView(options);
					case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
						return new DownloadableFileView(options);
					case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
						return new ExerciseView(options);
					case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
						return new RichTextView(options);
					case Config.stringsDict.RESOURCE_TYPE.VIDEO:
						return new VideoView(options);
					default:
						return null;
				}
			} else {
				return null;
			}
		}
		
	}
);
