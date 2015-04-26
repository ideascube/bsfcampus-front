define(['lib/window'],
	function (w) {

		return {

			serverGateway: w.location.origin + ':5000',
			
			imagesPath: 'assets/images/'

		};

	}
);