define(
	[
		'jquery',
		'underscore',
		'backbone',
        'app/config',

		'pods/static-page/collection',

        'text!app/footer/template.html',
        'text!app/footer/static-page-link-template.html',

        'less!app/footer/style'
    ],
	function($, _, Backbone, Config,
			 staticPagesCollection,
             template, staticPageLinkTemplate) {

		return Backbone.View.extend({

			template: _.template(template),
			staticPageLinkTemplate: _.template(staticPageLinkTemplate),

            initialize: function () {
				this.listenTo(staticPagesCollection, 'update', this.renderStaticPages);
            },

			render: function() {
				var html = this.template({config: Config});
				this.$el.html(html);
				this.$staticPagesList = this.$('#footer-static-pages-link-list ul');

                staticPagesCollection.fetchIfNeeded().done($.proxy(this.renderStaticPages, this));

				return this;
			},

			renderStaticPages: function(){
				this.$staticPagesList.empty();
				staticPagesCollection.each(function(page) {
					var html = this.staticPageLinkTemplate({
						page: page.toJSON(true)
					});
                    this.$staticPagesList.append(html);
				}, this);
			}

		});
		
	}
);
