define([],
    function () {

        return {

            SITE_TITLE: 'BSF Campus',
            SEARCH: 'Chercher',
            SEARCH_HINT: 'Recherche',
            QUIT: 'Quitter',
            START_EXERCISE: 'Commencer l\'exercice',
            EXERCISE_VALIDATED: 'Exercice validé',
            COMPLETED: 'complété',
            SKILLS_ACQUIRED: 'compétences acquises',
            START_TRACK: 'Commencer',
            RESUME_TRACK: 'Continuer',
            TRACK_VALIDATED: 'Validé',
            TRACK_TEST_VALIDATED: 'Parcours Validé',
            TRACK_TEST_VALIDATION_ALLOWED: 'Passer le test du parcours',
            SKILL_TEST_VALIDATED: 'Compétence Validée',
            SKILL_TEST_VALIDATION_ALLOWED: 'Passer le test de compétence',
            DOWNLOAD_FILE: 'Télécharger le fichier',

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
                FAILURE_MESSAGE: 'Aïe, certaines notions n\'ont peut-­être pas été bien assimilées ? Renforcez vos connaissances en consultant la ressource suivante.'
            },

            SKILL_VALIDATION: {
                SUCCESS_MESSAGE_HEADER: 'Super, vous avez validé cette compétence !',
                SUCCESS_MESSAGE: 'Ne vous arrêtez pas en si bon chemin !',
                FAILURE_MESSAGE_HEADER: 'Aïe, vous n\'êtes pas encore au point sur cette compétence !',
                FAILURE_MESSAGE: 'Reprenez les leçons et cela ira mieux la prochaine fois !'
            },

            TRACK_VALIDATION: {
                SUCCESS_MESSAGE_HEADER: 'Félicitations !',
                SUCCESS_MESSAGE: 'Suspendisse potenti. Nulla a luctus dolor, nec gravida ligula. Maecenas feugiat sapien at purus maximus, at accumsan nisl dignissim. Integer nisi magna, commodo ac augue in, eleifend tincidunt elit. In egestas tellus ac est finibus pulvinar. Sed vitae sem non odio feugiat feugiat sit amet ut nunc. Morbi quis euismod ligula. Fusce egestas arcu et porta aliquet. Nulla ac hendrerit dui. Suspendisse nisl ante, pharetra pharetra libero ac, hendrerit volutpat sapien.',
                FAILURE_MESSAGE_HEADER: 'On ne réussit pas toujours du premier coup !',
                FAILURE_MESSAGE: 'Prenez le temps de reprendre les leçons et les exercices afin valider ce parcours'
            },

            // Constants for Resources type
            RESOURCE_TYPE: {
                RICH_TEXT: 'RichTextResourceContent',
                VIDEO: 'VideoResourceContent',
                EXTERNAL_VIDEO: 'ExternalVideoResourceContent',
                EXERCISE: 'ExerciseResourceContent',
                AUDIO: 'AudioResourceContent',
                DOWNLOADABLE_FILE: 'DownloadableFileResourceContent'
            },

            HEADER: {
                LOG_OUT: 'Déconnexion',
                LOGIN: 'Connexion',
                ALL_TRACKS: 'Parcours',
                HOME_PAGE: 'Accueil',
                USER: 'Profil'
            },

            HOME: {
                BSF_HOME_PUNCHLINE: 'Bienvenue sur BSF Campus !',
                BSF_HOME_TEXT: '<p>En 2015, l\'ONG Bibliothèques Sans Frontières lance, avec le soutien de la '
                    + 'Bill & Melinda Gates Foundation, le programme BSF Campus, qui vise à renforcer les '
                    + 'bibliothèques publiques et communautaires d\'Afrique francophone dans leur rôle de '
                    + 'conduite de l\'innovation et de transformation sociale.</p>'
                    + '<p>BSF Campus, c\'est une plateforme d\'e-learning, gratuit et certifiant, pour les '
                    + 'professionnels en poste dans la région. La plateforme sera également accessible sans '
                    + 'internet (offline), pour les bibliothèques qui n\'ont pas accès au réseau.</p>',
                LOGIN: 'Connexion',
                REGISTER: 'Inscription',
                WELCOME: 'Bienvenue '
            },

            USER: {
                REGISTER: 'S\'inscrire',
                LOG_IN: 'Se connecter',
                FULL_NAME: 'Nom complet',
                EMAIL: 'E-mail',
                PASSWORD: 'Mot de pase',
                CONFIRM_PASSWORD: 'Confirmer le mot de passe',
                CGU: 'j\'accepte les <a href="#">conditions d\'utilisation</a> du site.',
                SUBMIT: 'Créer le compte',
                GOT_AN_ACCOUNT: 'Déjà un compte ?',
                PWD_FORGOTTEN: 'Mot de passe oublié ?',
                PROFILE: {
                    PROFILE_TITLE: 'RÉGLAGES DU COMPTE',
                    INSERT_IMG: 'Insérez un fichier',
                    SAVE_MODIFICATIONS: 'Sauvegarder les modifications',
                    PROFILE_PICTURE: 'Photo de profil'
                }
            }

        };
    }
);