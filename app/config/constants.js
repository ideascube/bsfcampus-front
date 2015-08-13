define(['config'],
	function (config) {

		var server_type;
		if (config.hasOwnProperty('server_type')) {
			if (config.server_type == 'local') {
				server_type = 'local';
			} else {
				server_type = 'central';
			}
		}

		var serverGateway;
		if (config.hasOwnProperty('api_root_url')) {
			serverGateway = config.api_root_url;
		} else {
			var port = server_type == 'local' ? 5001 : 5000;
			if (config.hasOwnProperty('server_port')) {
				port = config.server_port;
			}
			var api_path = '';
			if (config.hasOwnProperty('api_path')) {
				api_path = config.api_path;
			}

			serverGateway = window.location.protocol + '//' + window.location.hostname  + ':' + port + api_path;
		}

		return {

            VIEWS_ID: {
                HEADER: "HEADER",
                FOOTER: "FOOTER",
                HOME: "HOME_VIEW",
                CONNECTED_HOME: "CONNECTED_HOME_VIEW",
                REGISTER: "REGISTER",
                LOGIN: "LOGIN",
                RESET_PASSWORD: "RESET_PASSWORD",
                TRACK_LIST: "TRACK_LIST",
                TRACK_DETAIL: "TRACK_DETAIL",
                SKILL_DETAIL: "SKILL_DETAIL",
                RESOURCE_DETAIL: "RESOURCE_DETAIL",
                BREADCRUMB: "BREADCRUMB",
                PROMPT_TRACK_VALIDATION: "PROMPT_TRACK_VALIDATION",
                SEARCH_RESULTS: "SEARCH_RESULTS",
                STATIC_PAGE: "STATIC_PAGE",
                USER_PROFILE: "USER_PROFILE",
                SKILL_NAV: "SKILL_NAV",
                RESOURCE_CONTENT: "RESOURCE_CONTENT",
                EXERCISE_ATTEMPT: "EXERCISE_ATTEMPT",
                FAIL_LINK_RESOURCE: "FAIL_LINK_RESOURCE",
                SKILL_VALIDATION_ATTEMPT: "SKILL_VALIDATION_ATTEMPT",
                TRACK_VALIDATION_ATTEMPT: "TRACK_VALIDATION_ATTEMPT",
                USER_PROFILE_NAV_MENU: "USER_PROFILE_NAV_MENU",
                MERGE_ACCOUNT_MODAL: "MERGE_ACCOUNT_MODAL",
                DASHBOARD: "DASHBOARD",
                DASHBOARD_DETAILS: "DASHBOARD_DETAILS",
                ACCOUNT: "ACCOUNT",
                PASSWORD: "PASSWORD",
                TUTORING: "TUTORING",
                QUESTIONS: {
                    UNIQUE_ANSWER_MCQ: "UNIQUE_ANSWER_MCQ",
                    MULTIPLE_ANSWER_MCQ: "MULTIPLE_ANSWER_MCQ",
                    RIGHT_OR_WRONG: "RIGHT_OR_WRONG",
                    DROPDOWN: "DROPDOWN",
                    ORDERING: "ORDERING",
                    CATEGORIZER: "CATEGORIZER"
                }
            },

			server_type: server_type,

			serverGateway: serverGateway,

			imagesPath: 'assets/images/',

			userProfile: {
				DASHBOARD: "dashboard",
				ACCOUNT: "my_account",
				PASSWORD: "my_password",
				PARAMETERS: "settings",
                TUTORING: "tutoring"
			},

			registerErrorsCode: {
				INVALID_EMAIL_ADDRESS: 2,
				USERNAME_ALREADY_EXISTS: 3,
				PASSWORD: 4,
				PASSWORD_MATCH: 5,
				ACCEPT_CGU: 6
			},

			resetPasswordErrorsCode: {
				LOCAL_SERVER: 1,
				INVALID_EMAIL_ADDRESS: 2,
				INVALID_USERNAME: 3
			},

            changePasswordErrorsCode: {
                INVALID_CURRENT_PASSWORD: 1,
                INVALID_NEW_PASSWORD: 2,
                INVALID_CONFIRM_PASSWORD: 3
            },

            dsResourceNames: {
                STATIC_PAGE: 'static-page',
                TRACKS: 'tracks',
                SKILLS: 'skills',
                LESSONS: 'lessons',
                RESOURCES: 'resources',
                USER: 'user'
            }

		};

	}
);