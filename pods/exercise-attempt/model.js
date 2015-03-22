define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model',
	],
	function($, _, Backbone, Config,
		AbstractModel
		) {

		return AbstractModel.extend({
			
			jsonKey: "exercise_attempt",
			
			urlRoot: function() {
				return Config.constants.serverGateway + '/activity/exercise_attempts';
			},

			nextQuestionUrl: function() {
				return this.url() + '/next_question';
			}

		});

	}
);
