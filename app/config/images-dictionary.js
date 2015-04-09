define(
	[
		'app/config/constants',
	],
	function(Constants) {

		return {

			placeholder48: 'http://placehold.it/48x48/1caff6/ffffff',
			default_background_image: Constants.imagesPath + 'BG_macchupicchu_cut.png',

			arrow: Constants.imagesPath + 'arrow.png',
			arrowInCircle: Constants.imagesPath + 'iconmonstr-arrow-28-icon-256.png',
			studentHat: Constants.imagesPath + 'student-hat.png',
			quill: Constants.imagesPath + 'iconmonstr-pen-12-icon-256.png',
			checkStroke: Constants.imagesPath + 'iconmonstr-check-mark-4-icon-256.png',
			checkFull: Constants.imagesPath + 'iconmonstr-check-mark-3-icon-256.png',
			checkSingle: Constants.imagesPath + 'iconmonstr-check-mark-6-icon-256.png',
			greenCheck: Constants.imagesPath + 'check_green.png',
			wrong: Constants.imagesPath + 'wrong-icon.png',
			wrongRed: Constants.imagesPath + 'wrong-icon_red.png',
			certificateValidated: Constants.imagesPath + 'iconmonstr-certificate-validate.png',
			certificateLocked: Constants.imagesPath + 'iconmonstr-certificate-locked.png',
			lock: Constants.imagesPath + 'iconmonstr-lock-3-icon-256.png',
			download: Constants.imagesPath + 'download_arrow.png',
			inkDropOn: Constants.imagesPath + 'iconmonstr-drop-7-on.png',
			inkDropOff: Constants.imagesPath + 'iconmonstr-drop-7-off.png',
			resourceIcon: {
				RICH_TEXT: Constants.imagesPath + 'iconmonstr-text-file-4-icon-256_BLUE.png',
				VIDEO: Constants.imagesPath + 'iconmonstr-video-camera-icon-256_BLUE.png',
				EXERCISE: Constants.imagesPath + 'iconmonstr-pen-12-icon-256_BLUE.png',
				AUDIO: Constants.imagesPath + 'iconmonstr-sound-audio-icon-256_BLUE.png',
				DOWNLOADABLE_FILE: Constants.imagesPath + 'download.png',
			},

		};
	}
);