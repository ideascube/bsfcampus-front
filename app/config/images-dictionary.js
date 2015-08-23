define(
	[
		'app/config/constants',
	],
	function(Constants) {

		return {

			placeholder48: 'http://placehold.it/48x48/1caff6/ffffff',
			default_background_image: Constants.imagesPath + 'city.png',
			logo_gates_foundation: Constants.imagesPath + 'gatesfound.png',
			logo_bsf_campus: Constants.imagesPath + 'BSF_logo_header.png',
			logo_bsf: Constants.imagesPath + 'Logo-BSF_small.png',
			bell: Constants.imagesPath + 'bell.png',
			bellRed: Constants.imagesPath + 'bellRed.png',

			arrow: Constants.imagesPath + 'arrow.png',
			arrowInCircle: Constants.imagesPath + 'iconmonstr-arrow-28-icon-256.png',
			studentHat: Constants.imagesPath + 'student-hat.png',
			quill: Constants.imagesPath + 'iconmonstr-pen-12-icon-256.png',
			checkStroke: Constants.imagesPath + 'iconmonstr-check-mark-4-icon-256.png',
			checkFull: Constants.imagesPath + 'validate.png',
			checkSingle: Constants.imagesPath + 'iconmonstr-check-mark-6-icon-256.png',
			greenCheck: Constants.imagesPath + 'check_green.png',
			wrong: Constants.imagesPath + 'wrong-icon.png',
			wrongRed: Constants.imagesPath + 'wrong-icon_red.png',
			certificate: Constants.imagesPath + 'iconmonstr-certificate.png',
			lock: Constants.imagesPath + 'iconmonstr-lock-3-icon-256.png',
			download: Constants.imagesPath + 'download_arrow.png',
			orderingExerciseBg: Constants.imagesPath + 'carre_ligne.png',
            facebookLogo: Constants.imagesPath + 'icon_facebook.png',
            twitterLogo: Constants.imagesPath + 'icon_twitter.png',
            home: {
                bsfHomeImage: Constants.imagesPath + 'bsf_home_image.jpg',
                bsfHomeImage3: Constants.imagesPath + 'bsf_home_image_3.jpg',
                downArrow: Constants.imagesPath + 'down_arrow.png'
            },
			resourceIconOff: {
                RICH_TEXT: Constants.imagesPath + 'icon_text_off.png',
                VIDEO: Constants.imagesPath + 'icon_video_off.png',
                EXERCISE: Constants.imagesPath + 'icon_exercice_off.png',
                AUDIO: Constants.imagesPath + 'icon_audio_off.png',
                DOWNLOADABLE_FILE: Constants.imagesPath + 'icon_download_off.png'
			},
			resourceIconOn: {
                RICH_TEXT: Constants.imagesPath + 'icon_text_on.png',
                VIDEO: Constants.imagesPath + 'icon_video_on.png',
                EXERCISE: Constants.imagesPath + 'icon_exercice_on.png',
                AUDIO: Constants.imagesPath + 'icon_audio_on.png',
                DOWNLOADABLE_FILE: Constants.imagesPath + 'icon_download_on.png'
			},
			resourceIconWhite: {
				RICH_TEXT: Constants.imagesPath + 'icon_text_white.png',
				VIDEO: Constants.imagesPath + 'icon_video_white.png',
				EXERCISE: Constants.imagesPath + 'icon_exercice_white.png',
				AUDIO: Constants.imagesPath + 'icon_audio_white.png',
				DOWNLOADABLE_FILE: Constants.imagesPath + 'icon_download_white.png'
			},
            skillValidation: {

            },
            trackValidation: {
                CERTIFICATE: Constants.imagesPath + 'certificate_laurel.png',
                STARS: Constants.imagesPath + 'stars_tracks.png'
            }

		};
	}
);