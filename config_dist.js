// Make a copy of this file called config.js and customize configuration.

define(function(){ 

	var config = {};

	// Either define the API root URL by uncommenting the following line:
	// config.api_root_url = 'http://url_without_trailing_slash';

	// Or fill the settings below to generate the default URL (same hostname, port 5000 if central, 5001 if local)

	config.server_type = 'central';
	// Uncomment the line below if the server is on a custom port.
	// config.server_port = 5000;
	config.api_path = '';

	// Set the locale: available locales are defined by the names of the files in the app/config/strings directory
	config.locale = 'fr';

	return config;

});
