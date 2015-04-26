define(['lib/window'],
	function (w) {

		return {

			serverGateway: w.location.protocol + '//' + w.location.hostname  + ':5000',

			imagesPath: 'assets/images/'

		};

	}
);