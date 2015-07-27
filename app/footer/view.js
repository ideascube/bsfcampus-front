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
                var staticPages = DS.getAll('static-page');
                this.listenTo(staticPages, "change", this.render);
                this.listenTo(staticPages, "add", this.render);
            },

			render: function() {
                var staticPages = DS.getAll('static-page');
                this.$el.html(this.template({config: Config}));
                var $staticPagesList = this.$el.find('#static-pages-link-list');
                $staticPagesList.html('');
                _.each(staticPages.models, function(page) {
                    var pageSON = page.forTemplate();
                    $staticPagesList.append(this.staticPageLinkTemplate({page: pageSON}));
                }, this);
			}

		});
		
	}
);
