define(['config'],
	function (config) {

		var port = 5000;
		if (config.hasOwnProperty('server_port')) {
			port = config.server_port;
		} else if (config.hasOwnProperty('server_type')) {
			if (config.server_type == 'local') {
				port = 5001;
			}
		}

		var api_path = '';
		if (config.hasOwnProperty('api_path')) {
			api_path = config.api_path;
		}

		return {

            VIEWS_ID: {
                HOME: "HOME_VIEW"
            },

			serverGateway: window.location.protocol + '//' + window.location.hostname  + ':' + port + api_path,

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
			},

            changePasswordErrorsCode: {
                INVALID_CURRENT_PASSWORD: 1,
                INVALID_NEW_PASSWORD: 2,
                INVALID_CONFIRM_PASSWORD: 3
            }

		};

	}
);