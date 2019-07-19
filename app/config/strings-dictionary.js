define([],
    function () {

        return {

            SITE_TITLE: 'BSF Campus',
            QUIT: 'Quitter',
            START_EXERCISE: 'Commencer l\'exercice',
            EXERCISE_VALIDATED: 'Exercice validé',
            COMPLETED: 'complété',
            SKILLS_ACQUIRED: 'compétences acquises',
            START_TRACK: 'Commencer',
            RESUME_TRACK: 'Continuer',
            TRACK_VALIDATED: 'Validé',
            TRACK_TEST_VALIDATED: 'Parcours validé <span class="glyphicon glyphicon-ok-circle"></span>',
            TRACK_TEST_VALIDATION_ALLOWED: 'Passer le test du parcours',
            TRACK_TEST_VALIDATION_LOCKED: 'Passer le test du parcours <span class="glyphicon glyphicon-lock"></span>',
            SKILL_TEST_VALIDATED: 'Compétence validée <span class="glyphicon glyphicon-ok-circle"></span>',
            SKILL_TEST_VALIDATION_ALLOWED: 'Passer le test de compétence',
            SKILL_TEST_VALIDATION_LOCKED: 'Passer le test de compétence <span class="glyphicon glyphicon-lock"></span>',
            DOWNLOAD_FILE: 'Télécharger le fichier',
            ADDITIONAL_RESOURCES: 'Ressources complémentaires',
            LOADING: 'Chargement...',

            EXERCISES: {
                CHECK_RIGHT_ANSWERS: 'Cochez la ou les bonne(s) réponse(s)',
                CHECK_RIGHT_ANSWER: 'Cochez la bonne réponse',
                CHOOSE_MISSING_WORDS: 'Choisissez les mots manquants',
                ORDER_WORDS: 'Remettez les mots dans le bon ordre',
                VALIDATE: "Vérifier",
                CONTINUE: "Continuer",
                CLOSE: 'Fermer',
                RIGHT_ANSWER: 'BRAVO, BONNE REPONSE',
                WRONG_ANSWER_SINGLE: 'DOMMAGE, REPONSE INCORRECTE',
                WRONG_ANSWER_MULTI: 'DOMMAGE, AU MOINS UNE REPONSE EST INCORRECTE',
                SUCCESS_MESSAGE_HEADER: 'BRAVO, vous avez réussi cet exercice !',
                SUCCESS_MESSAGE: 'Vous pouvez désormais passer à un nouveau contenu et parfaire votre apprentissage.<br>Bonne continuation !',
                FAILURE_MESSAGE_HEADER: 'Dommage !',
                FAILURE_MESSAGE: 'Aïe, certaines notions n\'ont peut-­être pas été bien assimilées ? Renforcez vos connaissances en consultant la ressource suivante.',
                OBJECTIVE_MESSAGE: '<em><strong>Objectif : </strong>Réussir au moins [%NB_SUCCESS_MIN%] questions</em>',
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
                SUCCESS_MESSAGE_HEADER: 'Super, vous avez validé cette compétence !',
                SUCCESS_MESSAGE: 'Ne vous arrêtez pas en si bon chemin !',
                FAILURE_MESSAGE_HEADER: 'Aïe, vous n\'êtes pas encore au point sur cette compétence !',
                FAILURE_MESSAGE: 'Reprenez les leçons et cela ira mieux la prochaine fois !'
            },

            TRACK_VALIDATION: {
                PROMPT_HEADER_TEXT: 'BRAVO !',
                PROMPT_SUB_HEADER_TEXT: 'Vous êtes désormais prêt à passer le test de validation de parcours !',
                PROMPT_TEXT: 'Nam blandit velit quis sodales pharetra. Praesent erat nisl, hendrerit ut tortor ac, dictum ullamcorper metus. Etiam felis ex, maximus id volutpat eget, dictum sed ipsum. Quisque vehicula urna et magna posuere vulputate. Nullam facilisis tincidunt molestie. Etiam accumsan mollis erat, sodales aliquam magna maximus sed. Donec semper commodo lacus et consequat. Etiam vel massa urna. Aenean auctor odio ac velit sodales consectetur. Integer facilisis nunc a mauris consectetur, id dignissim lorem scelerisque.',
                GO_TO_TRACK_BUTTON: 'Aller au parcours',
                SUCCESS_MESSAGE_HEADER: 'Félicitations !',
                SUCCESS_MESSAGE: 'BSFCampus vous félicite pour la validation de ce parcours ! Vous pouvez obtenir votre certificat de validation BSFCampus en contactant l\'équipe à l\'adresse <a href="mailto:bsfcampus@bibliosansfrontieres.org">bsfcampus@bibliosansfrontieres.org</a>.',
                FAILURE_MESSAGE_HEADER: 'On ne réussit pas toujours du premier coup !',
                FAILURE_MESSAGE: 'Prenez le temps de reprendre les leçons et les exercices afin valider ce parcours'
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
                SEARCH_FIELD_DEFAULT: "Rechercher une ressource",
                SEARCH_BUTTON_LABEL: "Rechercher",
                LOG_OUT: 'Déconnexion',
                LOGIN: 'Connexion',
                ALL_TRACKS: 'Parcours',
                HOME_PAGE: 'Accueil',
                USER: 'Profil',

                NOTIFICATIONS: {
                    TUTOR_REQUEST_MESSAGE: " souhaite devenir votre tuteur",
                    TUTORED_STUDENT_REQUEST_MESSAGE: " souhaite que vous deveniez son tuteur",
                    ACKNOWLEDGE_TUTOR_MESSAGE: " a accepté d'être votre tuteur",
                    ACKNOWLEDGE_STUDENT_MESSAGE: " a accepté que vous soyiez son tuteur",
                    ACCEPT: "Accepter",
                    DECLINE: "Refuser",
                    ACKNOWLEDGE: "OK"
                }
            },

            FOOTER: {
                A_PROGRAM_BY: "Un programme de",
                SUPPORTED_BY: "Soutenu par",
                QUICK_ACCESS: "Accès rapide",
                JOIN_THE_COMMUNITY: "Rejoignez la communauté",
                FACEBOOK_LINK: "https://www.facebook.com/bsfcampus",
                TWITTER_LINK: "https://twitter.com/BSFontheweb"
            },

            HOME: {
                BSF_HOME_PUNCHLINE: "Bienvenue sur BSF Campus"
                    + "<small>La 1<sup>ère</sup> plateforme d'apprentissage personnalisée et gratuite pour les professionnels des bibliothèques</small>",
                LOGIN: 'Connexion',
                REGISTER: 'Inscription'
            },

            CONNECTED_HOME: {
                WELCOME_MESSAGE: 'Bienvenue sur BSF Campus Online, ',
                INFORMATION_MESSAGE: 'BSF Campus, c\'est une plateforme d\'e-learning, gratuite, certifiante et ouverte à tous.',
                TRACKS_HEADER: 'PARCOURS DE FORMATION',
                TRACKS_MESSAGE_MAIN: 'Retrouvez dès à présent les parcours de formation destinés aux professionnels des bibliothèques.',
                TRACKS_MESSAGE_TEXT: 'La plateforme sera également accessible sans internet (offline), pour les bibliothèques qui n\'ont pas accès au réseau.',
                TRACKS_BUTTON_LABEL: 'Découvrez les parcours de formation',
                TUTORING_HEADER: 'TUTORAT',
                TUTORING_MESSAGE_MAIN: 'BSF Campus, c\'est aussi une plateforme d\'apprentissage personnalisé.',
                TUTORING_MESSAGE_TEXT: "Mesurez vos progrès pour chaque parcours de formation, et accompagnez d'autres apprenants grâce au suivi personnalisé.",
                TUTORING_BUTTON_LABEL: 'Accédez à votre profil',
                NETWORK_HEADER: 'COMMUNAUTÉ',
                NETWORK_MESSAGE_MAIN: 'BSF Campus, c\'est aussi une communauté.',
                NETWORK_MESSAGE_TEXT: 'N\'hésitez pas à nous rejoindre sur nos réseaux sociaux.'
            },

            USER: {
                REGISTER: "S'inscrire",
                REGISTERING: "Inscription en cours...",
                LOG_IN: "Se connecter",
                LOGGING_IN: "Connexion en cours...",
                FULL_NAME: "Nom complet",
                USERNAME: "Identifiant",
                EMAIL: "E-mail",
                PASSWORD: "Mot de passe",
                CONFIRM_PASSWORD: "Confirmer le mot de passe",
                CGU: 'J\'accepte les <a href="#static_page/EULA" target="_blank" tabindex="-1">conditions d\'utilisation</a> du site.',
                SUBMIT: "Créer le compte",
                GOT_AN_ACCOUNT: "Déjà un compte ?",
                PWD_FORGOTTEN: "Mot de passe oublié ?",
                LOG_IN_ERROR: "L'identifiant et/ou le mot de passe n'existe pas",
                ERROR_FETCHING_USER: "Les données de l'utilisateur n'ont pu être récupérées",
                REGISTER_ERROR: {
                    INVALID_EMAIL_ADDRESS: "L'adresse e-mail est incorrecte",
                    USERNAME_ALREADY_EXISTS: "L'identifiant est déjà utilisé",
                    PASSWORD: "Le mot de passe est trop court",
                    PASSWORD_MATCH: "Les mots de passe ne correspondent pas",
                    ACCEPT_CGU: "Vous devez accepter les Conditions générales d'utilisation",
                    DEFAULT_ERROR: "Une erreur est survenue lors de l'inscription"
                },
                RESET_PASSWORD: 'Réinitialiser le mot de passe',
                RESETTING: "Réinitialisation en cours...",
                RESET_PASSWORD_MESSAGE: {
                    PASSWORD_SENT: "Un nouveau mot de passe a été envoyé par email",
                    LOCAL_SERVER: "Il faut se connecter à la plateforme centrale pour réinitialiser le mot de passe",
                    INVALID_EMAIL_ADDRESS: "Aucun utilisateur trouvé avec cette adresse email",
                    INVALID_USERNAME: "L'identifiant ne correspond pas à l'adresse email",
                    DEFAULT_ERROR: "Une erreur est survenue"
                },
                PROFILE: {
                    MENU: {
                        DASHBOARD: "Mon tableau de bord",
                        ACCOUNT: "Mon compte",
                        PASSWORD: "Mon mot de passe",
                        TUTORING: "Tutorat"
                    },
                    SAVE_MODIFICATIONS: 'Sauvegarder les modifications',
                    ACCOUNT: {
                        PROFILE_TITLE: 'Réglages du compte',
                        INSERT_IMG: 'Insérez un fichier',
                        PROFILE_PICTURE: 'Photo de profil',
                        SAVE_SUCCESS_MESSAGE: 'Vos modifications ont été enregistrées',
                        SAVE_FAIL_MESSAGE: "Erreur lors de l'enregistrement : Merci de vérifier les données"
                    },
                    MERGE: {
                        SUCCESS: "Le compte a bien été fusionné avec le compte existant !",
                        UNKNOWN_ERROR: "Une erreur inconnue est survenue.",
                        INVALID_CREDENTIALS: "Pas de compte trouvé sur ce serveur avec ce nom d'utilisateur et ce mot de passe.",
                        COULD_NOT_PERFORM_MERGE: "La fusion des comptes n'a pas pu être effectuée."
                    },
                    PASSWORD: {
                        TITLE: "Mon mot de passe",
                        CURRENT_PASSWORD: "Mot de passe actuel",
                        NEW_PASSWORD: "Nouveau mot de passe",
                        CONFIRM_NEW_PASSWORD: "Confirmer le nouveau mot de passe",
                        SAVE_MODIFICATIONS: 'Sauvegarder les modifications',
                        SAVE_SUCCESS_MESSAGE: 'Votre nouveau mot de passe a été enregistré',
                        CURRENT_PASSWORD_ERROR: 'Le mot de passe actuel est erroné',
                        ERROR_NEW_PASSWORD: 'Le nouveau mot de passe ne peut être vide',
                        ERROR_CONFIRM_NEW_PASSWORD: 'La confirmation du mot de passe ne correspond pas au nouveau mot de passe',
                        SAVE_FAIL_MESSAGE: "Erreur lors de l'enregistrement : Merci de vérifier les données"
                    },
                    DASHBOARD: {
                        TITLE: 'Mon tableau de bord',
                        TABLET_ALL_TRACKS_LIST: "LISTE DES PARCOURS",
                        ANALYTICS: {
                            NB_VISITS: "Vu [%NB_VISIT%] fois",
                            TRACK_LAST_ATTEMPT_SCORE: "au dernier test",
                            SKILL_LAST_ATTEMPT_SCORE: "au dernier test",
                            EXERCISE_LAST_ATTEMPT_SCORE: "à la dernière tentative",
                            TRACK_TEST_AVERAGE_TIME: "en moyenne sur le test de validation",
                            SKILL_TEST_AVERAGE_TIME: "en moyenne sur le test de validation",
                            EXERCISE_TEST_AVERAGE_TIME: "passé en moyenne sur l'exercice"
                        }
                    },
                    TUTORING: {
                        TITLE: "Tutorat",
                        SEARCHED_USERNAME: "Trouver un tuteur ou un élève",
                        SEARCHED_USERNAME_PLACEHOLDER: "Entrer l'identifiant de l'utilisateur",
                        SEARCH_BUTTON: "Rechercher",
                        TUTOR_BUTTON: "Tuteur",
                        STUDENT_BUTTON: "Elève",
                        SEARCH_RESULT_PENDING_REQUEST: "Demande en attente",
                        SEARCH_RESULT_ADD_TUTOR: "Ajouter comme tuteur",
                        SEARCH_RESULT_CANCEL_TUTOR: "Annuler la demande de tutorat",
                        SEARCH_RESULT_REMOVE_TUTOR: "Retirer ce tuteur",
                        SEARCH_RESULT_ADD_STUDENT: "Devenir tuteur",
                        SEARCH_RESULT_CANCEL_STUDENT: "Ne plus être tuteur",
                        SEARCH_RESULT_REMOVE_STUDENT: "Retirer cet élève",
                        SEARCH_NO_RESULT: "Aucun utilisateur n'a été trouvé",

                        STUDENT_ANALYTICS_TITLE: "Statistiques de l'élève",
                        DROPDOWN_STUDENT_DEFAULT: "Choisissez un élève",
                        CONFIRM_REMOVE_TUTOR: "Êtes-vous sûr de vouloir retirer ce tuteur ?",
                        CONFIRM_REMOVE_STUDENT: "Êtes-vous sûr de vouloir retirer cet étudiant ?",
                        CONFIRM_CANCEL_TUTOR: "Êtes-vous sûr de vouloir annuler cette demande ?",
                        CONFIRM_CANCEL_STUDENT: "Êtes-vous sûr de vouloir annuler cette demande ?",

                        TUTORS_LIST: "Liste de mes tuteurs",
                        SHOW_TUTORS_LIST: "Afficher la liste",
                        REMOVE_TUTOR: "Retirer"
                    }
                }
            },

            SEARCH: {
                RESULTS_FOR: "Résultats de la recherche pour "
            }

        };
    }
);
