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
			
			urlRoot: function() {
				return Config.constants.serverGateway + '/resources';
			},

			hierarchyUrl: function() {
				return this.url() + '/hierarchy';
			},

			route: function() {
				return '#/resource/' + this.id;
			},

            forTemplate: function() {

                var son = AbstractModel.prototype.forTemplate.call(this); // equivalent to super.forTemplate()

                if (this.get('resource_content') != null) {

                    var cls = this.get('resource_content')._cls.split('.').pop();

                    switch (cls) {
                        case Config.stringsDict.RESOURCE_TYPE.RICH_TEXT:
                            if (this.get('is_validated')) {
                                son.iconUrl = Config.imagesDict.resourceIconOn.RICH_TEXT;
                            } else {
                                son.iconUrl = Config.imagesDict.resourceIconOff.RICH_TEXT;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXTERNAL_VIDEO:
                        case Config.stringsDict.RESOURCE_TYPE.VIDEO:
                            if (this.get('is_validated')) {
                                son.iconUrl = Config.imagesDict.resourceIconOn.VIDEO;
                            } else {
                                son.iconUrl = Config.imagesDict.resourceIconOff.VIDEO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.EXERCISE:
                            if (this.get('is_validated')) {
                                son.iconUrl = Config.imagesDict.resourceIconOn.EXERCISE;
                            } else {
                                son.iconUrl = Config.imagesDict.resourceIconOff.EXERCISE;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.AUDIO:
                            if (this.get('is_validated')) {
                                son.iconUrl = Config.imagesDict.resourceIconOn.AUDIO;
                            } else {
                                son.iconUrl = Config.imagesDict.resourceIconOff.AUDIO;
                            }
                            break;
                        case Config.stringsDict.RESOURCE_TYPE.DOWNLOADABLE_FILE:
                            if (this.get('is_validated')) {
                                son.iconUrl = Config.imagesDict.resourceIconOn.DOWNLOADABLE_FILE;
                            } else {
                                son.iconUrl = Config.imagesDict.resourceIconOff.DOWNLOADABLE_FILE;
                            }
                            break;
                    }

                }

                return son;
            }

		});

	}
);
