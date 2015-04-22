define([],
	function() {

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
				VALIDATE: "Vérifier",
				CONTINUE: "Continuer",
				CLOSE: 'Fermer',
				RIGHT_ANSWER: 'BRAVO, BONNE REPONSE',
				WRONG_ANSWER_SINGLE: 'DOMMAGE, REPONSE INCORRECTE',
				WRONG_ANSWER_MULTI: 'DOMMAGE, AU MOINS UNE REPONSE EST INCORRECTE',
				SUCCESS_MESSAGE_HEADER: 'BRAVO, vous avez réussi cet exercice !',
				SUCCESS_MESSAGE: 'Vous pouvez désormais passer à un nouveau contenu et parfaire votre apprentissage.<br>Bonne continuation !',
				FAILURE_MESSAGE_HEADER: 'Aïe, certaines notions n\'ont peut-­être pas été bien assimilées ?',
				FAILURE_MESSAGE: 'Nous vous invitons à reprendre la leçon.<br>Courage !',
			},

			// Constants for Resources type
			RESOURCE_TYPE: {
				RICH_TEXT: 'RichTextResourceContent',
				VIDEO: 'VideoResourceContent',
				EXTERNAL_VIDEO: 'ExternalVideoResourceContent',
				EXERCISE: 'ExerciseResourceContent',
				AUDIO: 'AudioResourceContent',				
				DOWNLOADABLE_FILE: 'DownloadableFileResourceContent',
			},

		};
	}
);