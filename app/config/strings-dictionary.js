define(
	[
    'config',
		'app/config/strings/en',
		'app/config/strings/fr',
	],
	function(Config, EnglishStrings, FrenchStrings) {

    switch(Config.locale) {
      case 'en': return EnglishStrings;
      case 'fr': return FrenchStrings;
      default: return FrenchStrings;
    }

	}
);