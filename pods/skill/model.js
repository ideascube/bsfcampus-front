define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'model'
	],
	function($, _, Backbone, Config,
		AbstractModel
		) {

		return AbstractModel.extend({

			serverPath: '/hierarchy/skills',

            dsResourceName: Config.constants.dsResourceNames.SKILLS,

			_isValidated: null,

			isValidated: function() {
				if (this._isValidated == null) {
					this._isValidated = this.get('is_validated');
				}
				return this._isValidated;
			},

			route: function() {
				return '#/skill/' + this.id;
			},

            forTemplate: function(forTemplate) {
                var json = AbstractModel.prototype.forTemplate.call(this, forTemplate);
				if (forTemplate === true) {
					json.is_validated = this.isValidated();
				}
                return json;
            }

		});

	}
);
