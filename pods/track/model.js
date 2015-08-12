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

			serverPath: '/hierarchy/tracks',

            dsResourceName: Config.constants.dsResourceNames.TRACKS,

			_isValidated: null,

			isValidated: function() {
				if (this._isValidated == null) {
					this._isValidated = this.get('is_validated');
				}
				return this._isValidated;
			},

			_isStarted: null,

			isStarted: function() {
				if (this._isStarted == null) {
					this._isStarted = this.get('is_started');
				}
				return this._isStarted;
			},

			_testIsUnlocked: null,

			testIsUnlocked: function() {
				if (this._testIsUnlocked == null) {
					this._testIsUnlocked = this.get('test_is_unlocked');
				}
				return this._testIsUnlocked;
			},

			route: function() {
				return '#/track/' + this.id;
			},

            forTemplate: function() {

                var son = AbstractModel.prototype.forTemplate.call(this);

				son.is_completed = this.isValidated();
				son.is_started = this.isStarted();
				son.test_is_unlocked = this.testIsUnlocked();

                return son;
            }

		});

	}
);
