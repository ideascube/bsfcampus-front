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

			route: function() {
				return '#/skill/' + this.id;
			},

            forTemplate: function() {

                var son = AbstractModel.prototype.forTemplate.call(this); // equivalent to super.forTemplate()

                son.iconUrl = son.icon_url;

                return son;
            }

		});

	}
);
