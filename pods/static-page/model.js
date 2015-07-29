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

			serverPath: '/static_page',

			route: function() {
                var externalLink = this.get('external_link');
                if (externalLink != null)
                {
                    return externalLink;
                }

				return '#/static_page/' + this.get('page_id');
			}

		});

	}
);
