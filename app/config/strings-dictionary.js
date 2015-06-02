define([],
    function () {

        return {

            SITE_TITLE: 'BSF Campus',
            ALL_TRACKS: 'Parcours',
            SEARCH: 'Chercher',
            SEARCH_HINT: 'Recherche',
            START_EXERCISE: 'Commencer l\'exercice',
            COMPLETED: 'complété',
            SKILLS_ACQUIRED: 'compétences acquises',
            START_TRACK: 'Commencer',
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

            // Constants for Resources type
            RESOURCE_TYPE: {
                RICH_TEXT: 'RichTextResourceContent',
                VIDEO: 'VideoResourceContent',
                EXTERNAL_VIDEO: 'ExternalVideoResourceContent',
                EXERCISE: 'ExerciseResourceContent',
                AUDIO: 'AudioResourceContent',
                DOWNLOADABLE_FILE: 'DownloadableFileResourceContent'
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
                REGISTER: 'Inscription'
            },

            USER: {
                REGISTER: 'S\'inscrire',
                LOG_IN: 'Se connecter',
                FULL_NAME: 'Nom complet',
                EMAIL: 'E-mail',
                PASSWORD: 'Mot de pase',
                CONFIRM_PASSWORD: 'Confirmer le mot de passe',
                CGU: 'j\'accepte les conditions d\'utilisation du site',
                SUBMIT: 'Créer le compte'

            }

        };
    }
);