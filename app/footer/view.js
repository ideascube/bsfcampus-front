define(
	[
		'jquery',
		'underscore',
		'backbone',
        'ds',
		'app/config',
        'text!app/footer/template.html',
        'text!app/footer/static-page-link-template.html'
    ],
	function($, _, Backbone, DS, Config,
             template, staticPageLinkTemplate) {

		return Backbone.View.extend({

			el: $('#footer'),

			template: _.template(template),
			staticPageLinkTemplate: _.template(staticPageLinkTemplate),

            initialize: function () {
                var staticPages = DS.getAll(Config.constants.dsResourceNames.STATIC_PAGE);
                this.listenTo(staticPages, "change", this.render);
                this.listenTo(staticPages, "add", this.render);
            },

			render: function() {
                var staticPages = DS.getAll(Config.constants.dsResourceNames.STATIC_PAGE);
                this.$el.html(this.template({config: Config}));
                var $staticPagesList = this.$el.find('#footer-static-pages-link-list ul');
                $staticPagesList.html('');
                _.each(staticPages.models, function(page) {
                    var pageSON = page.forTemplate();
                    $staticPagesList.append(this.staticPageLinkTemplate({page: pageSON}));
                }, this);
			}

		});
		
	}
);
