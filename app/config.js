define(
	[
		'app/config/constants',
		'app/config/strings-dictionary',
		'app/config/images-dictionary',
	],
	function(Constants, StringsDictionary, ImagesDictionary) {

		return {

			constants: Constants,

			stringsDict: StringsDictionary,

			imagesDict: ImagesDictionary,

		};
	}
);