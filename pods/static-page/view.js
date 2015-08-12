define(
	[
		'jquery',
		'underscore',
		'backbone',
		'app/config',

		'text!pods/static-page/template.html',

		'less!pods/track/styles/list'
	],
	function($, _, Backbone, Config,
		staticPageTemplate
		) {

		return Backbone.View.extend({

			tagName: 'div',

			className: 'static-page',

			template: _.template(staticPageTemplate),

            initialize: function () {
                var staticPages = DS.getAll(Config.constants.dsResourceNames.STATIC_PAGE);
                this.listenTo(staticPages, "change", this.render);
                this.listenTo(staticPages, "add", this.render);
            },

			render: function() {
				$("body").removeAttr("style");

                var pageModelArray = DS.where(Config.constants.dsResourceNames.STATIC_PAGE, { page_id: this.pageId });
                if (pageModelArray != null && pageModelArray.length > 0)
                {
                    var pageModel = pageModelArray.models[0];
                    this.$el.html(this.template({content: pageModel.forTemplate()}));
                }

				return this;
			}

		});
		
	}
);
