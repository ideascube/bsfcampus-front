define(['lib/window', 'config'],
	function (w, config) {

		var port = 5000;
		if ('server_port' in config) {
			port = config.server_port;
		} else if ('server_type' in config) {
			if (config.server_type == 'local') {
				port = 5001;
			}
		}

		return {

			serverGateway: w.location.protocol + '//' + w.location.hostname  + ':' + port,

			imagesPath: 'assets/images/',

			userProfile: {
				DASHBOARD: "dashboard",
				ACCOUNT: "my_account",
				PASSWORD: "my_password",
				PARAMETERS: "settings"
			},

			registerErrorsCode: {
				INVALID_EMAIL_ADDRESS: 2,
				USERNAME_ALREADY_EXISTS: 3,
				PASSWORD: 4,
				PASSWORD_MATCH: 5,
				ACCEPT_CGU: 6
			}

		};

	}
);