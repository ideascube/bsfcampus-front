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

            forTemplate: function() {

                var son = AbstractModel.prototype.forTemplate.call(this);

                son.is_validated = this.isValidated();

                if (this.get('resource_content') != null) {

                    var cls = this.get('resource_content')._cls.split('.').pop();

                    switch (cls) {
                        case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
                            if (this.isValidated()) {
                                son.icon_url = Config.imagesDict.resourceIconOn.RICH_TEXT;
                            } else {
                                son.icon_url = Config.imagesDict.resourceIconOff.RICH_TEXT;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
                        case Config.stringsDict.RESOURCE_TYPE.VIDEO:
                            if (this.isValidated()) {
                                son.icon_url = Config.imagesDict.resourceIconOn.VIDEO;
                            } else {
                                son.icon_url = Config.imagesDict.resourceIconOff.VIDEO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
                            if (this.isValidated()) {
                                son.icon_url = Config.imagesDict.resourceIconOn.EXERCISE;
                            } else {
                                son.icon_url = Config.imagesDict.resourceIconOff.EXERCISE;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.AUDIO:
                            if (this.isValidated()) {
                                son.icon_url = Config.imagesDict.resourceIconOn.AUDIO;
                            } else {
                                son.icon_url = Config.imagesDict.resourceIconOff.AUDIO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
                            if (this.isValidated()) {
                                son.icon_url = Config.imagesDict.resourceIconOn.DOWNLOADABLE_FILE;
                            } else {
                                son.icon_url = Config.imagesDict.resourceIconOff.DOWNLOADABLE_FILE;
                            }
                            break;
                    }

                }

                return son;
            }

		});

	}
);
