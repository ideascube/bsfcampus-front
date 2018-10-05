define([],
  function () {

      return {

          SITE_TITLE: 'BSF Campus',
          QUIT: 'Quit',
          START_EXERCISE: 'Start the exercise',
          EXERCISE_VALIDATED: 'Exercise validated',
          COMPLETED: 'completed',
          SKILLS_ACQUIRED: 'skills acquired',
          START_TRACK: 'Start',
          RESUME_TRACK: 'Continue',
          TRACK_VALIDATED: 'Validated',
          TRACK_TEST_VALIDATED: 'Track validated <span class="glyphicon glyphicon-ok-circle"></span>',
          TRACK_TEST_VALIDATION_ALLOWED: 'Take the track test',
          TRACK_TEST_VALIDATION_LOCKED: 'Take the track test <span class="glyphicon glyphicon-lock"></span>',
          SKILL_TEST_VALIDATED: 'Skill validated <span class="glyphicon glyphicon-ok-circle"></span>',
          SKILL_TEST_VALIDATION_ALLOWED: 'Take the skill test',
          SKILL_TEST_VALIDATION_LOCKED: 'Take the skill test <span class="glyphicon glyphicon-lock"></span>',
          DOWNLOAD_FILE: 'Download file',
          ADDITIONAL_RESOURCES: 'Additional resources',
          LOADING: 'Loading...',

          EXERCISES: {
              CHECK_RIGHT_ANSWERS: 'Check the correct answer(s)',
              CHECK_RIGHT_ANSWER: 'Check the correct answer',
              CHOOSE_MISSING_WORDS: 'Choose the missing words',
              ORDER_WORDS: 'Sort the words in the correct order',
              VALIDATE: "Check",
              CONTINUE: "Continue",
              CLOSE: 'Close',
              RIGHT_ANSWER: 'CONGRATULATIONS, CORRECT ANSWER',
              WRONG_ANSWER_SINGLE: 'TOO BAD, INCORRECT ANSWER',
              WRONG_ANSWER_MULTI: 'TOO BAD, AT LEAST ONE ANSWER IS INCORRECT',
              SUCCESS_MESSAGE_HEADER: 'CONGRATULATIONS, you passed this exercise!',
              SUCCESS_MESSAGE: 'You can now move on to another content and perfect your learning.<br>Good luck!',
              FAILURE_MESSAGE_HEADER: 'Too bad!',
              FAILURE_MESSAGE: 'Looks like some notions weren\'t properly mastered? Strengthen your knowledge by reading the following resource.',
              OBJECTIVE_MESSAGE: '<em><strong>Objective: </strong>Pass at least [%NB_SUCCESS_MIN%] questions</em>',
              INSTRUCTIONS: { // TODO Fill instructions
                  CATEGORIZER: "",
                  DROPDOWNS: "",
                  MULTIPLE_ANSWER_MCQ: "",
                  ORDERING: "",
                  RIGHT_OR_WRONG: "",
                  UNIQUE_ANSWER_MCQ: ""
              }
          },

          SKILL_VALIDATION: {
              SUCCESS_MESSAGE_HEADER: 'Great, you validated this skill!',
              SUCCESS_MESSAGE: 'Keep going, you\'re doing great!',
              FAILURE_MESSAGE_HEADER: 'Looks like you haven\'t quite mastered this skill yet!',
              FAILURE_MESSAGE: 'Review the lessons and you\'ll do better next time!'
          },

          TRACK_VALIDATION: {
              PROMPT_HEADER_TEXT: 'CONGRATULATIONS!',
              PROMPT_SUB_HEADER_TEXT: 'You are now ready to take the track validation test!',
              PROMPT_TEXT: 'Nam blandit velit quis sodales pharetra. Praesent erat nisl, hendrerit ut tortor ac, dictum ullamcorper metus. Etiam felis ex, maximus id volutpat eget, dictum sed ipsum. Quisque vehicula urna et magna posuere vulputate. Nullam facilisis tincidunt molestie. Etiam accumsan mollis erat, sodales aliquam magna maximus sed. Donec semper commodo lacus et consequat. Etiam vel massa urna. Aenean auctor odio ac velit sodales consectetur. Integer facilisis nunc a mauris consectetur, id dignissim lorem scelerisque.',
              GO_TO_TRACK_BUTTON: 'Go to the track',
              SUCCESS_MESSAGE_HEADER: 'Congratulations!',
              SUCCESS_MESSAGE: 'Suspendisse potenti. Nulla a luctus dolor, nec gravida ligula. Maecenas feugiat sapien at purus maximus, at accumsan nisl dignissim. Integer nisi magna, commodo ac augue in, eleifend tincidunt elit. In egestas tellus ac est finibus pulvinar. Sed vitae sem non odio feugiat feugiat sit amet ut nunc. Morbi quis euismod ligula. Fusce egestas arcu et porta aliquet. Nulla ac hendrerit dui. Suspendisse nisl ante, pharetra pharetra libero ac, hendrerit volutpat sapien.',
              FAILURE_MESSAGE_HEADER: 'We don\'t always succeed on the first time!',
              FAILURE_MESSAGE: 'Take your time to review the lessons and exercises in order to validate this track'
          },

          // Constants for Resources type
          RESOURCE_TYPE: {
              RICH_TEXT: 'RichTextResource',
              VIDEO: 'VideoResource',
              EXTERNAL_VIDEO: 'ExternalVideoResource',
              EXERCISE: 'ExerciseResource',
              AUDIO: 'AudioResource',
              DOWNLOADABLE_FILE: 'DownloadableFileResource'
          },

          HEADER: {
              SEARCH_FIELD_DEFAULT: "Look for a resource",
              SEARCH_BUTTON_LABEL: "Search",
              LOG_OUT: 'Log out',
              LOGIN: 'Log in',
              ALL_TRACKS: 'Track',
              HOME_PAGE: 'Homepage',
              USER: 'Profile',

              NOTIFICATIONS: {
                  TUTOR_REQUEST_MESSAGE: " wants to become your mentor",
                  TUTORED_STUDENT_REQUEST_MESSAGE: " wants you to become their mentor",
                  ACKNOWLEDGE_TUTOR_MESSAGE: " accepted to be your mentor",
                  ACKNOWLEDGE_STUDENT_MESSAGE: " accepted that you become their mentor",
                  ACCEPT: "Accept",
                  DECLINE: "Decline",
                  ACKNOWLEDGE: "OK"
              }
          },

          FOOTER: {
              A_PROGRAM_BY: "A program by",
              SUPPORTED_BY: "Supported by",
              QUICK_ACCESS: "Quick access",
              JOIN_THE_COMMUNITY: "Join the community",
              FACEBOOK_LINK: "https://www.facebook.com/bsfcampus",
              TWITTER_LINK: "https://twitter.com/BSFontheweb"
          },

          HOME: {
              BSF_HOME_PUNCHLINE: "Welcome to BSF Campus"
                  + "<small>The first free personnalized learning platform for professional librarians</small>",
              LOGIN: 'Log in',
              REGISTER: 'Register',
              PRESENTATION_TITLE: 'Presentation',
              PRESENTATION_TEXT: "Les bibliothèques ont aujourd’hui bien plus à offrir qu’une simple collection de livres. Elles peuvent donner à chacun libre accès aux nouveaux instruments de l’éducation et de l'entrepreneuriat, de la culture et de l’information, mais aussi aux technologies et à l’Internet. Elles sont plus que jamais des outils de lutte contre les inégalités et des leviers de transformation sociale.",
              READ_MORE: 'Read more',
              CONTENTS_TITLE: 'Contents',
              CONTENTS_SUBTITLE: '6 parcours pédagogiques accessibles en ligne &amp; hors-ligne',
              CONTENTS_TEXT: "La bibliothèque, savoirs fondamentaux | Médiation culturelle et animation <br /> Oser l'innovation ! | La conduite de projet | L'évaluation d'impact | Le plaidoyer",
              PERSONNALISATION_TITLE: "Personnalisation",
              PERSONNALISATION_SUBTITLE: "Plus de 100 leçons et exercices pour progresser à son rythme",
              FREE_NO_ADS: "The BSF Campus platforme is <em>free</em> and <em>ads-free</em>.",
              CREATED_BY_WITH: "Créée par l'ONG Bibliothèques Sans Frontières avec le soutien de la Bill &amp; Melinda Gates Foundation.",
              START_LEARNING: "Start learning"
          },

          CONNECTED_HOME: {
              WELCOME_MESSAGE: 'Welcome to  BSF Campus Online, ',
              INFORMATION_MESSAGE: 'BSF Campus is a free, certifying and open e-learning platform.',
              TRACKS_HEADER: 'LEARNING TRACKS',
              TRACKS_MESSAGE_MAIN: 'Go ahead and find learning tracks designed for professional librarians.',
              TRACKS_MESSAGE_TEXT: 'The platform will also be available offline, for libraries who cannot access the Web.',
              TRACKS_BUTTON_LABEL: 'Discover the learning tracks',
              TUTORING_HEADER: 'MENTORING',
              TUTORING_MESSAGE_MAIN: 'BSF Campus is also a personnalized learning platform.',
              TUTORING_MESSAGE_TEXT: "Measure your progress on each learning track, and follow other learners thanks to the mentoring feature.",
              TUTORING_BUTTON_LABEL: 'Access your profile',
              NETWORK_HEADER: 'COMMUNITY',
              NETWORK_MESSAGE_MAIN: 'BSF Campus is also a community.',
              NETWORK_MESSAGE_TEXT: 'Feel free to join us on our social networks.'
          },

          USER: {
              REGISTER: "Register",
              REGISTERING: "Registering...",
              LOG_IN: "Log in",
              LOGGING_IN: "Logging in...",
              FULL_NAME: "Full name",
              USERNAME: "Username",
              EMAIL: "Email",
              PASSWORD: "Password",
              CONFIRM_PASSWORD: "Confirm password",
              CGU: 'I accept the <a href="#static_page/EULA" target="_blank" tabindex="-1">EULA</a>.',
              SUBMIT: "Create account",
              GOT_AN_ACCOUNT: "Already have an account?",
              PWD_FORGOTTEN: "Password forgotten?",
              LOG_IN_ERROR: "The username and/or password doesn't exist",
              ERROR_FETCHING_USER: "The user data couldn't be retrieved",
              REGISTER_ERROR: {
                  INVALID_EMAIL_ADDRESS: "The email addres is incorrect",
                  USERNAME_ALREADY_EXISTS: "The username already exists",
                  PASSWORD: "The password is too short",
                  PASSWORD_MATCH: "The passwords don't match",
                  ACCEPT_CGU: "You must accept the EULA",
                  DEFAULT_ERROR: "An error occurred during the registration"
              },
              RESET_PASSWORD: 'Reset password',
              RESETTING: "Resetting password...",
              RESET_PASSWORD_MESSAGE: {
                  PASSWORD_SENT: "A new password has been sent by email",
                  LOCAL_SERVER: "You need to connect to the central platform to reset your password",
                  INVALID_EMAIL_ADDRESS: "No user found with this email address",
                  INVALID_USERNAME: "The username doesn't match the email address",
                  DEFAULT_ERROR: "An error occurred"
              },
              PROFILE: {
                  MENU: {
                      DASHBOARD: "My dashboard",
                      ACCOUNT: "My account",
                      PASSWORD: "My password",
                      TUTORING: "Mentoring"
                  },
                  SAVE_MODIFICATIONS: 'Save changes',
                  ACCOUNT: {
                      PROFILE_TITLE: 'Account settings',
                      INSERT_IMG: 'Insert a file',
                      PROFILE_PICTURE: 'Profile picture',
                      SAVE_SUCCESS_MESSAGE: 'Your changes have been saved',
                      SAVE_FAIL_MESSAGE: "Error while saving: please chack the data"
                  },
                  MERGE: {
                      SUCCESS: "The account was merged successfuly with the existing account!",
                      UNKNOWN_ERROR: "An unknown error occurred.",
                      INVALID_CREDENTIALS: "No account found on this server with this username and password.",
                      COULD_NOT_PERFORM_MERGE: "The accounts couldn't be merged."
                  },
                  PASSWORD: {
                      TITLE: "My password",
                      CURRENT_PASSWORD: "Current password",
                      NEW_PASSWORD: "New password",
                      CONFIRM_NEW_PASSWORD: "Confirm new password",
                      SAVE_MODIFICATIONS: 'Save changes',
                      SAVE_SUCCESS_MESSAGE: 'Your new password has been saved',
                      CURRENT_PASSWORD_ERROR: 'The current password is incorrect',
                      ERROR_NEW_PASSWORD: 'The new password cannot be empty',
                      ERROR_CONFIRM_NEW_PASSWORD: 'The password confirmation doesn\'t match the new password',
                      SAVE_FAIL_MESSAGE: "Error while saving: please check the data"
                  },
                  DASHBOARD: {
                      TITLE: 'My dashboard',
                      TABLET_ALL_TRACKS_LIST: "TRACKS LIST",
                      ANALYTICS: {
                          NB_VISITS: "Seen [%NB_VISIT%] times",
                          TRACK_LAST_ATTEMPT_SCORE: "on the last test",
                          SKILL_LAST_ATTEMPT_SCORE: "on the last test",
                          EXERCISE_LAST_ATTEMPT_SCORE: "on the last attempt",
                          TRACK_TEST_AVERAGE_TIME: "in average on the validation test",
                          SKILL_TEST_AVERAGE_TIME: "in average on the validation test",
                          EXERCISE_TEST_AVERAGE_TIME: "spent on average on the exercise"
                      }
                  },
                  TUTORING: {
                      TITLE: "Mentoring",
                      SEARCHED_USERNAME: "Find a mentor or a student",
                      SEARCHED_USERNAME_PLACEHOLDER: "Enter the user's username",
                      SEARCH_BUTTON: "Search",
                      TUTOR_BUTTON: "Mentor",
                      STUDENT_BUTTON: "Student",
                      SEARCH_RESULT_PENDING_REQUEST: "Request pending",
                      SEARCH_RESULT_ADD_TUTOR: "Add as a mentor",
                      SEARCH_RESULT_CANCEL_TUTOR: "Cancel mentorship request",
                      SEARCH_RESULT_REMOVE_TUTOR: "Remove mentor",
                      SEARCH_RESULT_ADD_STUDENT: "Become mentor",
                      SEARCH_RESULT_CANCEL_STUDENT: "No longer be a mentor",
                      SEARCH_RESULT_REMOVE_STUDENT: "Remove student",
                      SEARCH_NO_RESULT: "No user found",

                      STUDENT_ANALYTICS_TITLE: "Student analytics",
                      DROPDOWN_STUDENT_DEFAULT: "Choose a student",
                      CONFIRM_REMOVE_TUTOR: "Are you sure you want to remove this mentor?",
                      CONFIRM_REMOVE_STUDENT: "Are you sure you want to remove this student?",
                      CONFIRM_CANCEL_TUTOR: "Are you sure you want to annuler this request?",
                      CONFIRM_CANCEL_STUDENT: "Are you sure you want to annuler this request?",

                      TUTORS_LIST: "Mentors list",
                      SHOW_TUTORS_LIST: "Display list",
                      REMOVE_TUTOR: "Remove"
                  }
              }
          },

          SEARCH: {
              RESULTS_FOR: "Search results for "
          }

      };
  }
);
