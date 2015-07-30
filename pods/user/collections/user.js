define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',
		
		'collection',
		
		'pods/user/models/user',
	],
	function($, _, Backbone, Config,
		AbstractCollection,
		UserModel
		) {

		return AbstractCollection.extend({

			model: UserModel,

            dsResourceName: Config.constants.dsResourceNames.USER,

			serverPath: '/users'

		});

	}
);
