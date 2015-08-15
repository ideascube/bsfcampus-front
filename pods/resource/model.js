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
			
			serverPath: '/resources',

            dsResourceName: Config.constants.dsResourceNames.RESOURCES,

            _isValidated: null,

            isValidated: function() {
                if (this._isValidated == null) {
                    this._isValidated = this.get('is_validated');
                }
                return this._isValidated;
            },

			hierarchyUrl: function() {
				return this.url() + '/hierarchy';
			},

			route: function() {
				return '#/resource/' + this.id;
			},

            toJSON: function(forTemplate) {

                var json = AbstractModel.prototype.toJSON.call(this, forTemplate);

                if (forTemplate === true) {

                    json.is_validated = this.isValidated();

                    if (this.get('resource_content') != null) {

                        var cls = this.get('_cls').split('.').pop();

                        switch (cls) {
                            case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
                                if (this.isValidated()) {
                                    json.icon_url = Config.imagesDict.resourceIconOn.RICH_TEXT;
                                } else {
                                    json.icon_url = Config.imagesDict.resourceIconOff.RICH_TEXT;
                                }
                                break;
                            case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
                            case Config.stringsDict.RESOURCE_TYPE.VIDEO:
                                if (this.isValidated()) {
                                    json.icon_url = Config.imagesDict.resourceIconOn.VIDEO;
                                } else {
                                    json.icon_url = Config.imagesDict.resourceIconOff.VIDEO;
                                }
                                break;
                            case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
                                if (this.isValidated()) {
                                    json.icon_url = Config.imagesDict.resourceIconOn.EXERCISE;
                                } else {
                                    json.icon_url = Config.imagesDict.resourceIconOff.EXERCISE;
                                }
                                break;
                            case Config.stringsDict.RESOURCE_TYPE.AUDIO:
                                if (this.isValidated()) {
                                    json.icon_url = Config.imagesDict.resourceIconOn.AUDIO;
                                } else {
                                    json.icon_url = Config.imagesDict.resourceIconOff.AUDIO;
                                }
                                break;
                            case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
                                if (this.isValidated()) {
                                    json.icon_url = Config.imagesDict.resourceIconOn.DOWNLOADABLE_FILE;
                                } else {
                                    json.icon_url = Config.imagesDict.resourceIconOff.DOWNLOADABLE_FILE;
                                }
                                break;
                        }

                    }

                }

                return json;

            }

		});

	}
);
